const express=require("express");
const pool=require("../pool");

const router=express.Router();

router.get("/",(req,res)=>{
  var kwords = decodeURIComponent(req.query.kwords);
  var output = {
    pno: 0,
    pageSize: 15,
    count: 0,
    pageCount: 0,
    products: []
  }
  if(req.query.pno !== undefined)
    output.pno = parseInt(req.query.pno)
  kwords = kwords.split(" ");
  kwords.forEach((val,i,arr)=>{
    arr[i] = `%${val}%`
  })
  var arr=[];
  for(var kw of kwords){
    arr.push(` title like ? `);
  }
  var where = " WHERE " + arr.join(" and ");
  var sql = "SELECT lid,img_url,title,subtitle,price,type1 FROM ly_products " + where;
  pool.query(sql,kwords,(err,result)=>{
    if(err) throw err;
    var count = result.length;
    var pageCount = Math.ceil(count/output.pageSize);
        output.count = count;
        output.pageCount = pageCount;
    var starti = output.pno*output.pageSize;
    output.products = result.slice(starti,starti + output.pageSize);
    res.send(output)
 });
})






/* 导出 */
module.exports=router;