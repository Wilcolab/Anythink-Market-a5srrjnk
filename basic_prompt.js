function camelCase(str) {
    return str
        .split(/[\s_-]+/)
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// Example usage:
// console.log(camelCase("mytext")); // "myText"
// console.log(camelCase("hello world")); // "helloWorld"
// console.log(camelCase("some_text_here")); // "someTextHere"