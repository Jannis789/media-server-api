const PasswordOptions = {
    SALT_LENGTH: 16,
    HASH_LENGTH: 64,
    ITERATIONS: 10000,
    DIGEST: "sha512"
} as const;

export default PasswordOptions;