module.exports = {
    '**/*.{js,jsx}': ['eslint', 'prettier --check'],
    '**/*.{ts,tsx}': [
        () => 'tsc --skipLibCheck --noEmit',
        'eslint --cache',
        'prettier --check',
    ],
    '**/*.{css,md}': ['prettier --check'],
}
