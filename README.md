# gulp-project
> 目前是为了同步 Windows 和 MacOS，直接使用了文件目录，仅仅启动了 browser-sync 插件

## Learning Document

* [VirtualDom](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/vdom/doc.md )
* [MVVM框架](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/mvvm/doc.md)
* [Zepto源码学习一二](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/doc.md#zepto)
* [Zepto对象思想及源码学习](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/myzepto-core.md)
* [防抖、节流，原型链继承之圣杯模式](https://github.com/yangtao2o/gulp-project/blob/master/src/zepto/doc.md)
* [Class、继承、Promise](https://github.com/yangtao2o/gulp-project/blob/master/src/JavaScript/es6/doc.md )

## Gulp(全局)
```bash
// Update
git clone https://github.com/yangtao2o/gulp-project.git

npm install

// Gulp start
npm run dev
```
## MyWebpack
```bash
➜  gulp-project git:(master) ✗ cd src/mywebpack/
➜  mywebpack git:(master) ✗ npm i
➜  mywebpack git:(master) ✗ npm start

> mywebpack@1.0.0 start /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack --mode=development

Hash: b0d74482c77a2aa40e58
Version: webpack 4.29.5
Time: 751ms
Built at: 2019-02-21 09:24:16
            Asset      Size  Chunks             Chunk Names
./build/bundle.js  3.95 KiB    main  [emitted]  main
Entrypoint main = ./build/bundle.js
[./src/index.js] 157 bytes {main} [built]

> mywebpack@1.0.0 dev /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack-dev-server --config ./webpack.config.js --mode=development

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: Hash: 0cff533f8881da90d38f
Version: webpack 4.29.5
Time: 991ms
Built at: 2019-02-21 09:27:39
```

## MyRollup
* rollup 功能单一，webpack 功能强大
* 参考设计原则和《Linux/Unix设计思想》
* 工具要尽量功能单一，可集成，可扩展
* gulp + rollup

```bash
➜  src git:(master) ✗ mkdir myrollup
➜  src git:(master) ✗ cd myrollup 
# 初始化
➜  myrollup git:(master) ✗ npm init

# 下载依赖包
➜  myrollup git:(master) ✗ npm i rollup-plugin-node-resolve rollup-plugin-babel babel-core babel-plugin-external-helpers babel-preset-latest --save-dev

# 配置文件
➜  myrollup git:(master) ✗ touch .babelrc rollup.config.js
```

## 关于 JS 众多模块化标准
* 没有模块化
* AMD成为标准，require.js(也有CMD)
* 前端打包工具，是node.js模块化可以被使用
* ES6出现，想统一现在所有模块化标准
* nodejs积极支持，浏览器尚未统一

#### 模块化
* 语法：import export(注意有无default)
* 环境：babel编译 ES6 语法，模块化可用 webpack 和 rollup
* 扩展：对模块化标准统一的期待
  
