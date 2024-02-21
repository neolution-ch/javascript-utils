# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### dependabot: \#31 Bump ip from 1.1.8 to 1.1.9

## [0.4.0] - 2024-01-29

- added `CacheProvider<TEnum>` utility class
- export the `StandardEnum<T>` type

## [0.3.1] - 2024-01-19

- added export `lib/string` and `lib/guid`

## [0.3.0] - 2024-01-15

- added `isNullOrEmpty`, `isNullOrWhitespace` and `capitalize` utility functions

## [0.2.0] - 2024-01-11

### dependabot: \#19 Bump tj-actions/changed-files from 37 to 41 in /.github/workflows

### dependabot: \#20 Bump @babel/traverse from 7.21.5 to 7.23.7

- added `dateIsValid`, `dateIsLastDayOfMonth` and `dateDifferenceInDays` utility functions
- added `newGuid` function and `emptyGuid` constant
- added `getLocalStorageItem`, `setLocalStorageItem` and `removeLocalStorageItem` utility functions

## [0.1.1] - 2023-08-04

### Fixed

- Fixed export for CommonJS

## [0.1.0] - 2023-08-03

### Added

- added `eslint-plugin-jsdoc` to lint jsdoc comments
- `getEnumNameFromValue`,`getEnumValueFromName`, `getEnumNames`,`getEnumNameValues` functions to respectively get the name of an enum from its value, the value from its name, all the names and all the values

[unreleased]: https://github.com/neolution-ch/javascript-utils/compare/0.4.0...HEAD
[0.4.0]: https://github.com/neolution-ch/javascript-utils/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/neolution-ch/javascript-utils/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/neolution-ch/javascript-utils/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/neolution-ch/javascript-utils/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/neolution-ch/javascript-utils/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/neolution-ch/javascript-utils/releases/tag/0.1.0
