module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-expressions": 0,
        "no-redeclare": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "no-self-assign": 0
    }
}
