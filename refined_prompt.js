/**
 * Converts a given string to camelCase format.
 *
 * - Removes unwanted characters except spaces, hyphens, and underscores.
 * - Splits the string by spaces, hyphens, or underscores.
 * - Lowercases all words.
 * - Capitalizes the first letter of each word except the first.
 * - Joins the words without any separator.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The camelCase formatted string. Returns an empty string if input is not a valid string or results in an empty value.
 *
 * @example
 * camelCase("hello-world"); // "helloWorld"
 * camelCase("Convert THIS to Camel"); // "convertThisToCamel"
 * camelCase("snake_case_string"); // "snakeCaseString"
 * camelCase(" "); // ""
 * camelCase(null); // ""
 * camelCase("123 and done"); // "123AndDone"
 * camelCase("convert 123 to camel"); // "convert123ToCamel"
 */

/**
 * Converts a given string to dot.case format.
 *
 * - Removes unwanted characters except spaces, hyphens, and underscores.
 * - Splits the string by spaces, hyphens, or underscores.
 * - Lowercases all words.
 * - Joins the words using a dot ('.') as the separator.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The dot.case formatted string. Returns an empty string if input is not a valid string or results in an empty value.
 *
 * @example
 * dotCase("hello-world"); // "hello.world"
 * dotCase("Convert THIS to Dot"); // "convert.this.to.dot"
 * dotCase("snake_case_string"); // "snake.case.string"
 * dotCase(" "); // ""
 * dotCase(null); // ""
 * dotCase("123 and done"); // "123.and.done"
 * dotCase("convert 123 to dot"); // "convert.123.to.dot"
 */
function camelCase(input) {
    if (typeof input !== 'string' || input === null) return '';
    // Remove unwanted characters except spaces, hyphens, and underscores
    let cleaned = input.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
    if (cleaned === '') return '';
    // Split by space, hyphen, or underscore (one or more)
    let words = cleaned.split(/[\s_-]+/);
    // Lowercase all words
    words = words.map(word => word.toLowerCase());
    // Capitalize first letter of each word except the first
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
    }
    return words.join('');
}

// Example usage:
// console.log(camelCase("hello-world")); // "helloWorld"
// console.log(camelCase("Convert THIS to Camel")); // "convertThisToCamel"
// console.log(camelCase("snake_case_string")); // "snakeCaseString"
// console.log(camelCase(" ")); // ""
// console.log(camelCase(null)); // ""
// console.log(camelCase("123 and done")); // "123AndDone"
// console.log(camelCase("convert 123 to camel")); // "convert123ToCamel"
function dotCase(input) {
    if (typeof input !== 'string' || input === null) return '';
    // Remove unwanted characters except spaces, hyphens, and underscores
    let cleaned = input.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
    if (cleaned === '') return '';
    // Split by space, hyphen, or underscore (one or more)
    let words = cleaned.split(/[\s_-]+/);
    // Lowercase all words and join with dots
    return words.map(word => word.toLowerCase()).join('.');
}

// Example usage:
// console.log(dotCase("hello-world")); // "hello.world"
// console.log(dotCase("Convert THIS to Dot")); // "convert.this.to.dot"
// console.log(dotCase("snake_case_string")); // "snake.case.string"
// console.log(dotCase(" ")); // ""
// console.log(dotCase(null)); // ""
// console.log(dotCase("123 and done")); // "123.and.done"
// console.log(dotCase("convert 123 to dot")); // "convert.123.to.dot"
