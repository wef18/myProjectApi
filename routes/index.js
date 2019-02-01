const express=require("express");
const pool=require("../pool");

const router=express.Router();

router.get("/",(req,res)=>{
  var output = {}
  var sql = `SELECT * FROM ly_index_product;
             SELECT cid,title,img_url FROM ly_index_carousel WHERE condition1=0 LIMIT 4;`
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    output.listItems = result[0]
    output.lbItems = result[1]
    res.send(output);
  })
})






/* 导出 */
module.exports=router;