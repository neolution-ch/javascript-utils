import { execSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";
import { createJiti } from "jiti";

/**
 * The interface for the package.json structure we need to test
 */
interface PackageJson {
  /**
   * The name of the library as specified in package.json
   */
  name: string;
  /**
   * The exports field of the package.json, specifying entry points for import and require
   */
  exports: {
    /**
     * The main entry point for the library
     */
    ".": {
      /**
       * The ESM entry point for the library
       */
      import: string;
      /**
       * The CommonJS entry point for the library
       */
      require: string;
    };
  };
}

const MIN_NODE_MAJOR = 22;
const MIN_NODE_MINOR = 12;

// Read and parse package.json using standard FS to avoid CJS require() in TS
const pkgPath = path.join(process.cwd(), "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as PackageJson;
const libName = pkg.name;

console.log(`\n🧪 Starting bundle integration tests for ${libName}...\n`);

// 0. Environment & Node version check
const [major = 0, minor = 0] = process.versions.node.split(".").map(Number);
if (major < MIN_NODE_MAJOR || (major === MIN_NODE_MAJOR && minor < MIN_NODE_MINOR)) {
  throw new Error(
    `❌ Test aborted: Node.js version >= ${MIN_NODE_MAJOR}.${MIN_NODE_MINOR}.0 is required.` +
      `   Current version is ${process.versions.node}.` +
      `   Node versions below 22.12.0 do not support synchronous ESM loading in CommonJS without flags.`,
  );
}

// 1. Ensure the latest build is available
console.log("📦 Compiling the library...");
try {
  execSync("yarn build", { stdio: "inherit" });
} catch (error) {
  throw new Error(`❌ Build compilation failed.`, { cause: error });
}

// --------------------------------------------------------
// ESM BUNDLE TEST (Native Node.js execution)
// --------------------------------------------------------
console.log("\n▶️ [ESM] Testing bundle functionality...");
try {
  const esmEntry = path.join(process.cwd(), pkg.exports["."].import);
  const esmUrl = pathToFileURL(esmEntry).href;

  // Base64 encode the script to avoid cross-platform quote/escaped char hell in terminal commands
  const inlineEsmScript = `
    import { newGuid, isValidGuid, getQuarter } from ${JSON.stringify(esmUrl)};
    
    const guid = newGuid();
    if (!isValidGuid(guid)) {
      throw new Error('Generated GUID is invalid: ' + guid);
    }
    
    const quarter = getQuarter(new Date('2026-11-10'));
    if (quarter !== 4) {
      throw new Error('Unexpected quarter calculation: ' + quarter);
    }
    
    console.log("   GUID test passed:", guid);
    console.log("   date-fns test passed (Quarter):", quarter);
  `;
  const base64Script = Buffer.from(inlineEsmScript).toString("base64");

  execSync(`node --input-type=module --eval "import 'data:text/javascript;base64,${base64Script}'"`, { stdio: "inherit" });
  console.log("✅ [ESM] Passed successfully!");
} catch (error) {
  throw new Error("❌ [ESM] Test failed!", { cause: error });
}

// --------------------------------------------------------
// CJS BUNDLE TEST (Using jiti to simulate CJS require)
// --------------------------------------------------------
console.log("\n▶️ [CJS] Testing bundle functionality...");
try {
  const cjsEntry = path.join(process.cwd(), pkg.exports["."].require);

  // jiti simulates a strict CommonJS require() context
  const jiti = createJiti(import.meta.url, { interopDefault: true });

  // Cast and destructure the specific functions we want to test
  const { newGuid, isValidGuid, getQuarter } = jiti(cjsEntry) as {
    /**
     * Generates a new GUID string.
     */
    newGuid: () => string;
    /**
     * Validates whether the given string is a valid GUID.
     */
    isValidGuid: (guid: string) => boolean;
    /**
     * Calculates the quarter of the given date.
     */
    getQuarter: (date: Date) => number;
  };

  const guid = newGuid();
  if (!isValidGuid(guid)) {
    throw new Error(`Generated GUID is invalid: ${guid}`);
  }

  const quarter = getQuarter(new Date("2026-11-10"));
  if (quarter !== 4) {
    throw new Error(`Unexpected quarter calculation: ${quarter}`);
  }

  console.log("   GUID test passed:", guid);
  console.log("   date-fns test passed (Quarter):", quarter);
  console.log("✅ [CJS] Passed successfully!");
} catch (error) {
  throw new Error("❌ [CJS] Test failed!", { cause: error });
}

console.log("\n🎉 All bundles are fully functional in both ESM and CJS formats!\n");
