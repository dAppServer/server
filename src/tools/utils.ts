import * as Colors from "https://deno.land/std@0.130.0/fmt/colors.ts";

/**
 * Console Information style
 * @param text
 */
console.info = (text) => console.log(Colors.blue('[INFO] ') , text)
/**
 * Console warning style
 * @param text
 */
console.warn = (text) => console.log(Colors.yellow('[WARNING] ') , text)
/**
 * Console error styling
 * @param text
 */
console.error = (text) => console.log(Colors.red('[ERROR] ') , text)
