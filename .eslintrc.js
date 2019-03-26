module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["html", "prettier", "react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: "10",
    ecmaFeatures: {
      impliedStrict: "true",
      classes: "true",
    },
  },
  env: {
    browser: "true",
    node: "true",
    jest: "true",
  },
  globals: {},
  rules: {
    // general
    "prefer-const": ["error"],
    radix: ["error", "as-needed"],
    "comma-dangle": "off",
    "consistent-return": "off",
    "func-names": "off",
    "max-len": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": [2, { allowTaggedTemplates: true }],
    "no-unused-vars": ["error", { args: "none" }],
    "no-shadow": "error",
    "space-before-function-paren": "off",

    // debugging
    "no-alert": "warn",
    "no-debugger": "warn",
    "no-console": "warn",

    // react
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/display-name": 1,
    "react/no-array-index-key": 0,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],

    // prettier
    "prettier/prettier": "error",

    // import
    "import/extensions": ["error", "always", { js: "never", jsx: "never" }],
    "import/prefer-default-export": "off",
  },
}
