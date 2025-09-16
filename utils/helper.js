// Generate a unique email using timestamp (and a tiny random suffix to avoid collisions)
export function uniqueEmail(prefix = 'ivan.qa') {
    const unique = `${Date.now()}${Math.random().toString(36).slice(-3)}`;
    return `${prefix}+${unique}@example.com`;
}

// Generate a readable unique display name (keeps a stable prefix)
export function uniqueName(prefix = 'Ivan QA') {
    const unique = Date.now().toString().slice(-6);
    return `${prefix} ${unique}`;
}

// Mask password in logs to avoid leaking secrets
export function maskPassword() {
    return '********';
}