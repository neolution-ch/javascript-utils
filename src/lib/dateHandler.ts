/**
 * The TranslateMonth type
 */
type TranslateMonth = (month: number) => string;

/**
 * DateHandler class
 */
export class DateHandler {
  /**
   * Get formatted date as string with default date format "dd.MM.yyyy"
   * @param dateString The date string to format
   * @returns Date string formatted
   */
  public static getDateString(dateString: string): string {
    return this.getDateFormatted(dateString, "dd.MM.yyyy");
  }

  /**
   * Get formatted date as string with custom date format
   * @param dateString The date string to format
   * @param dateFormat The date format
   * @param defaultString The default string
   * @returns Date string formatted
   */
  public static getDateFormattedWithDefault(dateString: string | Date, dateFormat: string, defaultString: string): string {
    if (dateString === null || dateString === undefined) {
      return defaultString;
    }
    return this.getDateFormatted(dateString, dateFormat);
  }

  /**
   * Format date string
   * @param dateString The date string to format
   * @param dateFormat The date format
   * @returns Date string formatted
   */
  public static getDateFormatted(dateString: string | Date, dateFormat: string): string {
    const date = new Date(dateString);
    let formattedDateString = dateFormat;

    if (dateFormat.indexOf("MMMM") >= 0) {
      formattedDateString = formattedDateString.replace("MMMM", this.translateMonthMethod(date.getMonth() + 1));
    }

    return formattedDateString
      .replace("yyyy", date.getFullYear().toString())
      .replace("MM", this.padNumber(date.getMonth() + 1, 2))
      .replace("dd", this.padNumber(date.getDate(), 2))
      .replace("hh", this.padNumber(date.getHours(), 2))
      .replace("HH", this.padNumber(date.getHours(), 2))
      .replace("mm", this.padNumber(date.getMinutes(), 2))
      .replace("ss", this.padNumber(date.getSeconds(), 2));
  }

  /**
   * Set the month translation method
   * @param monthTranslationMethod How month should be translated
   */
  public static setMonthTranslationMethod(monthTranslationMethod: TranslateMonth) {
    this.translateMonthMethod = monthTranslationMethod;
  }

  /**
   * Translate month method
   * @param month The month index
   * @returns The translated month
   */
  private static translateMonthMethod: TranslateMonth = (month) => {
    console.info("Translate Month Method of DateHandler not set, uses browser default logic");
    const date = new Date(2000, month - 1, 1);
    return date.toLocaleString("default", {
      /**
       * Month format
       */
      month: "long",
    });
  };

  /**
   * Pad number
   * @param number Number to pad
   * @param max Max value to pad
   * @returns Number as string padded
   */
  private static padNumber(number: number, max: number): string {
    return this.padNumberString(number.toString(), max);
  }

  /**
   * Pad number as string
   * @param str The string to pad
   * @param max Max value to pad
   * @returns Number as string padded
   */
  private static padNumberString(str: string, max: number): string {
    return str.length < max ? this.padNumberString(`0${str}`, max) : str;
  }
}
