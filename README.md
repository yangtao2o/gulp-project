# gulp-project
> 目前是为了同步 Windows 和 MacOS，直接使用了文件目录，仅仅启动了 browser-sync 插件，并且只以列表形式展开

## 全局
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
npm install
➜  mywebpack git:(master) ✗ npm start
> es6@1.0.0 start /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack --mode=development

Hash: b0d74482c77a2aa40e58
Version: webpack 4.29.5
Time: 751ms
Built at: 2019-02-21 09:24:16
            Asset      Size  Chunks             Chunk Names
./build/bundle.js  3.95 KiB    main  [emitted]  main
Entrypoint main = ./build/bundle.js
[./src/index.js] 157 bytes {main} [built]

> es6@1.0.0 dev /Users/yangtao/Documents/github/gulp-project/src/mywebpack
> webpack-dev-server --config ./webpack.config.js --mode=development

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: Hash: 0cff533f8881da90d38f
Version: webpack 4.29.5
Time: 991ms
Built at: 2019-02-21 09:27:39
```
