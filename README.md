# Vue仿蘑菇街移动商城开发

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### API接口
- 方法一
  百度搜索蘑菇街开放平台，按照网页上提示的方法注册蘑菇街账号，申请API应用，可以获得蘑菇街给你提供的API，很全，基本上蘑菇街的业务逻辑API接口都可以用，但是要申请到APP key
- 方法二
  添加coderwhy老师wx，找老师购买接口，可以多多支持老师
- 方法三
  采用爬虫去爬虫蘑菇街的数据，存放在数据库里面，搭建一个本地服务器，然后访问，这种方法方便适合开发，coderwhy老师也是用的这种方法，至于怎么爬，怎么用
  请先拉取这位作者写的spider和利用node搭建的服务器[mallAPI](https://github.com/constown/mallAPI)，只需要在你的电脑上安装node环境和mysql数据库就行了。
  使用方法：
  - 安装node
  - 安装mysql
  - 建立supermall数据库
  - 执行作者项目中spider下面的supermall.sql使其导入数据到supermall数据库 （可以使用命令行命令，也可以用Navicat这些工具来执行.sql到指定数据库）
  - 使用npm运行作者项目中的www（默认命令 npm run start）
  后台默认端口是 localhost:3000 在vue mall项目中，给你所使用的ajax或者axios添加baseURL为http://localhost:3000就行了
  然后可以看app.js里面的路由配置，基本上和coderwhy老师提供的api接口路径是一致的，有兴趣可以在其基础上添加更多的东西
  
  感谢constown作者提供的mallAPI接口，也感谢coderwhy老师的视频
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
