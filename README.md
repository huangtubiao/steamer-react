# 开发
npm run dev

# 编译
npm run pub

# 打开页面
* 腾讯新闻主页
127.0.0.1:9000/index.html
或
127.0.0.1:9000/news/index.html

* 腾讯新闻spa页
127.0.0.1:9000/spa.html
或
127.0.0.1:9000/news/spa.html

由于我们在webpack.server.js中，使用proxy映射路径到news，因此也可以带上路径news来访问


# 多个页面的开发
添加html到src/目录下就可以了，现在steamer-react会自动识别


# Devtools
* ctrl + h进行切换
* ctrl + q切换位置

其它命令可以参考src/page/common/DevTools。可以调defaultSize设置自己喜欢的大小。目前默认设置在底部，占30%的屏幕大小。

# 文件目录
* 单页面文件可参考 src/page/index
* 单页应用可参考 src/page/spa


# 合图代码
请统一放在 src/page/xxx/container/xxx.scss中，可参考src/page/index里面的做法。
这里的问题囿于插件局限性，之后建议找更好的插件，或者我们自己写一个。

目前构建已经支持多个合图。只需要在src/img/sprites/下面新建文件夹，然后放在需要合的图，就会自动在src/css/文件夹下生成sprites/文件夹，里面包含了对应的合图和scss。

# Windows下node-sass的安装
在node版本大于4.0的环境下，调用“npm rebuild node-sass ”时会自动安装“node-gyp”模块。window下的“node-gyp”模块需要以下配置：

* python(v2.7) （https://www.python.org/ftp/python/2.7.9/python-2.7.9.amd64.msi）
* Microsoft Visual Studio C++ 2013 （https://www.visualstudio.com/downloads/download-visual-studio-vs#d-express-windows-desktop）


尝试：
https://github.com/nodejs/node-gyp/wiki/Visual-Studio-2010-Setup

# 更多使用办法
* 可参考webpack的官方文档
* [webpack使用优化（基本篇）](https://github.com/lcxfs1991/blog/issues/2)
* [webpack使用优化（react篇）](https://github.com/lcxfs1991/blog/issues/7)
