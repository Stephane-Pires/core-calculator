// configration extends techno
const EXTENDS_AIRBNB_JAVASCRIPT = ['airbnb']

const EXTENDS_AIRBNB_TYPESCRIPT = ['airbnb-typescript']

const EXTENDS_PRETTIER = ['prettier']

// configuration extends file types
const EXTENDS_JAVASCRIPT = [...EXTENDS_AIRBNB_JAVASCRIPT, ...EXTENDS_PRETTIER]

const EXTENDS_TYPESCRIPT = [
    ...EXTENDS_AIRBNB_JAVASCRIPT,
    ...EXTENDS_AIRBNB_TYPESCRIPT,
    ...EXTENDS_PRETTIER,
]

// overrides depending on language
const TYPESCRIPT = [
    {
        extends: EXTENDS_TYPESCRIPT,
        files: ['*.ts', '*.tsx'],
        parserOptions: {
            project: ['./tsconfig.json'],
        },
    },
]

// configuration
module.exports = {
    extends: EXTENDS_JAVASCRIPT,
    overrides: TYPESCRIPT,
    parser: '@typescript-eslint/parser',
}
