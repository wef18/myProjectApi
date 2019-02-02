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
  if(num == 0){
    // 默认排序
    var sql = "SELECT lid,img_url,title,subtitle,price,type1 FROM ly_products " + where;
  }else if(num == 1){
    // 价格从高到低排序
    var sql = "SELECT lid,img_url,title,subtitle,price,type1 FROM ly_products " + where + " ORDER BY price DESC";
  }else if(num == 2){
    // 价格从低到高排序
    var sql = "SELECT lid,img_url,title,subtitle,price,type1 FROM ly_products " + where + " ORDER BY price ASC";
  }
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