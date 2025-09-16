// utils/helper.js
export function uniqueEmail(prefix = 'ivan.qa') {
    const unique = `${Date.now()}${Math.random().toString(36).slice(-3)}`;
    return `${prefix}+${unique}@example.com`;
}

export function uniqueName(prefix = 'Ivan QA') {
    const unique = Date.now().toString().slice(-6);
    return `${prefix} ${unique}`;
}

// Strong runtime password (used only if TEST_PASSWORD is not provided)
export function generateStrongPassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function maskPassword() {
    return '********';
}