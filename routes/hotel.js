const express=require("express");
const pool=require("../pool");

const router=express.Router();
//酒店
router.get("/hotel",(req,res)=>{
  var output = {};
  var sql = `SELECT hid,title,subtitle,pic1,pic,price FROM ly_hotel WHERE recommend=1 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE family_id=2 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE family_id=3 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE family_id=16 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE family_id=10 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE family_id=9 LIMIT 3;
             SELECT hid,title,pic,price FROM ly_hotel WHERE recommend=2 LIMIT 10;
             SELECT cid,title,img_url FROM ly_index_carousel WHERE condition1=1 LIMIT 4;`
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    output.jxItems = result[0];
    output.shItems = result[1];
    output.szItems = result[2];
    output.xmItems = result[3];
    output.hzItems = result[4];
    output.hebItems = result[5];
    output.tsItems = result[6];
    output.lbItems = result[7];
    res.send(output);
  })
})
//特卖会
router.get("/sale",(req,res)=>{
  var output = {};
  var sql = `SELECT cid,title,img_url FROM ly_index_carousel WHERE condition1=2 LIMIT 4;
             SELECT aid,title,subtitle,pic,price FROM ly_sale WHERE condition1=0;
             SELECT aid,title,subtitle,pic,price FROM ly_sale WHERE condition1=1;`
  pool.query(sql,(err,result)=>{
    if(err) throw err
    output.lbItems = result[0];
    output.ppItems = result[1];
    output.myList = result[2];
    res.send(output);
  })
})

/* 导出 */
module.exports=router;