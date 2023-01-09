module.exports = {
  "root": false,
  "env": {
    "node": true,
  },
  "rules": {
    "no-debugger": "off",
    "indent": ["error", 2],
    "no-multi-assign": "error",
    "arrow-spacing": [2, {
      "before": true,
      "after": true
    }],
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "parser": "babel-eslint"
  }
}