import { Colors } from "/deps.ts";

/**
 * Console Information style
 * @param {string} message
 */
console.info = (message) => console.log(Colors.blue("[INFO] "), message);
/**
 * Console warning style
 * @param {string} message
 */
console.warn = (message) => console.log(Colors.yellow("[WARNING] "), message);
/**
 * Console error styling
 * @param {string} message
 */
console.error = (message) => console.log(Colors.red("[ERROR] "), message);
