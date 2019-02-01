const express=require("express");
const pool=require("../pool");

const router=express.Router();

router.get("/",(req,res)=>{
  var sql = "SELECT * FROM ly_index_product";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})






/* 导出 */
module.exports=router;