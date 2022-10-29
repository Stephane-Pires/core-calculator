module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            [
                'project',
                'dev-tooling',
                'library',
                'database',
                'assets',
                'utils',
                'layout',
                'schema',
            ],
        ],
    },
}
