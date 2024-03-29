module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unsafe-return": 0,
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unsafe-member-access": 0,
        "no-console": 0
    }
};
