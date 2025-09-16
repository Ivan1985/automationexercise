// helper.js
export function uniqueEmail(prefix = 'ivan.qa') {
    return `${prefix}+${Date.now()}@example.com`;
}
export function uniqueName(prefix = 'Ivan QA') {
    return `${prefix} ${Date.now().toString().slice(-5)}`;
}
// Generate a random password at runtime — never logged
export function generatePassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
// Return masked string for logs (if absolutely needed)
export function maskPassword() {
    return '********';
}