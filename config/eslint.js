// config/eslint.js
module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    semi: ["error", "always"],
  },
};
