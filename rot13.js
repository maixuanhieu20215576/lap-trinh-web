function rot13(str) {
    return str.replace(/[A-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        // Shift the letter by 13 positions
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    });
}