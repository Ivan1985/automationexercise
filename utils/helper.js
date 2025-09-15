// Generates unique emails/usernames per run (simple timestamp).
export function uniqueEmail(prefix = 'ivan.qa') {
    const stamp = Date.now();
    return `${prefix}+${stamp}@example.com`;
}

export function uniqueName(prefix = 'Ivan QA') {
    const stamp = Date.now().toString().slice(-5);
    return `${prefix} ${stamp}`;
}