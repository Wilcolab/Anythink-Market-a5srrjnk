function toKebabCase(input) {
    if (typeof input !== 'string') return '';

    // Trim and remove special characters except alphanumeric, space, underscore
    let str = input.trim()
        .replace(/[^a-zA-Z0-9 _-]+/g, '');

    // Replace underscores with spaces
    str = str.replace(/_/g, ' ');

    // Split camelCase words with a space
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

    // Replace multiple spaces or hyphens with a single space
    str = str.replace(/[\s-]+/g, ' ');

    // Convert to lowercase, split by space, and join with hyphens
    return str
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .join('-');
}