module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  settings: {
    "import/resolver": {
      alias: [
        ["@components", "./src/components"],
        ["@styles", "./src/styles"],
        ["@hooks", "./src/hooks"],
        ["@utils", "./src/utils"]
      ]
    },
  },
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/forbid-prop-types': 'off',
    'linebreak-style': 'off',
  }
}