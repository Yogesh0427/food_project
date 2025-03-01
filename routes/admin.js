var express=require('express')
var router=express.Router()
var pool=require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');

router.get("/login",function(req,res,next){
    res.render("login",{message:''})
})
router.post('/check_login',function(req,res,next){
    pool.query("select * from admins where (email_id=? or mobile_num=?) and password=?",[req.body.email_id,req.body.email_id,req.body.password],function(error,result){
        if(error)
        {
            res.render('login',{message: 'Database error pls connect with database administrator'})
        }
        else
        {
            if(result.length==1)
            {
                localStorage.setItem('ADMIN',JSON.stringify(result[0]))
                res.render('dashbord',{data:result[0]})
            }
            else
            {
                res.render('login',{message:'Invalid Email Id/Mobile No./Password'})
            }
        }
    })
})
router.get("/logout",function(req,res,next){
    localStorage.clear()
    res.redirect("/admin/login")
})
router.get("/mw",function(req,res,next){
    res.render("mw")
})
module.exports=router