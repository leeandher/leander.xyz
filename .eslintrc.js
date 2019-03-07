module.exports = {
  extends: ["prettier", "prettier/react"],
  plugins: ["html", "prettier", "react", "react-hooks"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // general
    "no-var": "error",
    "no-unused-vars": ["error", { args: "none" }],

    // react
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",

    // prettier
    "prettier/prettier": "error",
  },
}
