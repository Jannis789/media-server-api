import { pbkdf2Sync, randomBytes } from 'crypto';

const PasswordOptions = {
    SALT_LENGTH: 16,
    HASH_LENGTH: 64,
    ITERATIONS: 10000,
    DIGEST: 'sha512',
} as const;

function encryptPassword(password: string): string {
    const salt = randomBytes(PasswordOptions.SALT_LENGTH).toString('hex');
    const hash = pbkdf2Sync(
        password,
        salt,
        PasswordOptions.ITERATIONS,
        PasswordOptions.HASH_LENGTH,
        PasswordOptions.DIGEST,
    ).toString('hex');

    return `${salt}:${hash}`;
}


function verifyPassword(password: string, passwordHash: string): boolean {
    const [salt, hash] = passwordHash.split(':');
    if (!salt || !hash) return false;
    const inputHash = pbkdf2Sync(
        password,
        salt,
        PasswordOptions.ITERATIONS,
        PasswordOptions.HASH_LENGTH,
        PasswordOptions.DIGEST,
    ).toString('hex');
    return inputHash === hash;
}


export { 
    PasswordOptions, 
    encryptPassword, 
    verifyPassword,
};