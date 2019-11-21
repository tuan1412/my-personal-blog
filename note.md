## Eslint airbnb
- Tải các package cần thiết ở https://www.npmjs.com/package/eslint-config-airbnb
- Extends ở file .eslintrc.js
- Với lỗi line-break thì cần check unix hay window

## Config alias
- Mục tiêu:
    + Webpack hiểu được
    + Eslint hiểu được
    + vscode hiểu được
- Cách làm
    + config alias trong webpack-config
    + import eslint-import-resolver-webpack config trong .eslintrc
    + add file jsConfig.json
