/** 引入第三方模块 **/
const PORT = 5050; 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session=require('express-session');
/** 引入路由模块 **/ 
const index = require("./routes/index");
const products = require("./routes/products");
const hotel = require("./routes/hotel");
const user = require("./routes/user");

var server = express();
server.listen(PORT, ()=>{
  console.log('Server Listening: '+PORT);
});
server.use(bodyParser.urlencoded({
  extended:false
}));
  //托管静态文件到public目录
server.use(express.static(__dirname+"/public"));

/** 解决跨域问题 **/
server.use(cors({
  'credentials':true,
  origin:"http://tianchengapi.applinzi.com"
}))

// 使用 session 中间件
server.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

/** 使用路由器来管理路由 **/
server.use("/index",index);
server.use("/products",products);
server.use("/hotel",hotel);
server.use(user);
