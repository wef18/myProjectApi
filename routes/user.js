const express=require("express");
const pool=require("../pool");

const router=express.Router();


//用户注册
router.post("/register",(req,res)=>{
  //获取post请求的数据
  var data = req.body;
  var $uname = data.uname, $upwd = data.upwd, $phone = data.uphone, $email = data.uemail;
  //判断用户名、密码、手机号、邮箱是否为空
  if(!$uname){
    res.send({code:401,msg:"name required"});
    //阻止后续执行
    return;
  }
  if(!$upwd){
    res.send({code:402,msg:"upwd required"});
    return;
  }
  if(!$phone){
    res.send({code:403,msg:"phone required"});
    return;
  }
  if(!$email){
    res.send({code:404,msg:"email required"});
    return;
  }
  //执行SQL语句，将注册的数据插入ly_user数据表中，
  var sql = "INSERT INTO ly_user VALUES(NULL,?,PASSWORD(?),?,?,?,'img/ee.jpg',now(),1)";
  pool.query(sql,[$uname,$upwd,$email,$phone,$uname],(err,result)=>{
    if(err) throw err;
    //判断是否添加成功
    if(result.affectedRows > 0){
      if(err) throw err;
      res.send({code:200,msg:"register suc"});
    }
  })
})

//检测用户名是否被注册
router.get("/checkname",(req,res)=>{
  var $uanme = req.query.uname;
  if(!$uanme){
    res.send({code:401,msg:"uname required"});
    return;
  }
  var sql = "SELECT uid FROM ly_user WHERE uname=? LIMIT 1"
  pool.query(sql,$uanme,(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code:201,msg:"exists"})
    }else{
      res.send({code:200,msg:'non-exists'});
    }
  })
})
//检测手机号是否被注册
router.get("/checkphone",(req,res)=>{
  var $phone = req.query.uphone;
  if(!$phone){
    res.send({code:401,msg:"phone required"});
    return;
  }
  var sql = "SELECT uid FROM ly_user WHERE uphone=? LIMIT 1"
  pool.query(sql,$phone,(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code:201,msg:"exists"})
    }else{
      res.send({code:200,msg:'non-exists'});
    }
  })
})
//检测邮箱是否被注册
router.get("/checkemail",(req,res)=>{
  var $email = req.query.uemail;
  if(!$email){
    res.send({code:401,msg:"email required"});
    return;
  }
  var sql = "SELECT uid FROM ly_user WHERE uemail=? LIMIT 1"
  pool.query(sql,$email,(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      res.send({code:201,msg:"exists"})
    }else{
      res.send({code:200,msg:'non-exists'});
    }
  })
})

//用户登录
router.post("/login",(req,res)=>{
  var $name = req.body.uname;
  var $pwd = req.body.upwd;
  if(!$name){
    res.send({code:401,msg:"name required"});
    //阻止后续执行
    return;
  }
  if(!$pwd){
    res.send({code:402,msg:"upwd required"});
    return;
  }
  var sql = "SELECT id FROM ly_login WHERE uname=? AND upwd=PASSWORD(?) LIMIT 1";
  pool.query(sql,[$name,$pwd],(err,result)=>{
    if(err) throw err;
    if(result.length > 0){
      req.session.loginUname=$name;
      req.session.loginUid=result[0].id;
      res.send({code:200,msg:'login suc'});
    }else{
      res.send({code:301,msg:'login err'});
    }
  })
})

//用户退出
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send({code:200,msg:'logout succ'});
});




/* 导出 */
module.exports=router;