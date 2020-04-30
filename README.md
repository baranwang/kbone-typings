# kbone typings

![](https://img.shields.io/npm/v/kbone-typings.svg?style=flat) ![](https://img.shields.io/github/license/baranwang/kbone-typings.svg)

kbone API 的 TypeScript 类型定义文件

## 安装

```sh
yarn add kbone-typings
```

## 使用

`tsconfig.json` 中加入

```json
{
  "compilerOptions": {
    "types": [
      // ...
      "kbone-typings"
      // ...
    ]
  }
}
```

`miniprogram.config.js` 文件可用 [JSDoc](https://github.com/jsdoc/jsdoc) 方案进行类型推导

```js
/**
 * @type {import('kbone-typings').KboneConfig}
 */
const miniprogramConfig = {}
module.exports = miniprogramConfig
```