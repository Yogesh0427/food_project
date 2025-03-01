var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');

router.get("/food_interface",function(req,res,next){
    try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data)
    res.render('food_interface',{message:''})
    else
    res.render('login',{message:''})
    }
    catch(e)
    {
        res.render('login',{message:''})
    }
})
router.post("/fooddata_submit",upload.single('picture'), function(req,res,next){
    console.log(req.body)
    pool.query("insert into food_data(category_id, subcategory_id, food_id, ingridients, price, offer_price, status, food_type, taste, picture) value(?,?,?,?,?,?,?,?,?,?)",[req.body.category_id, req.body.subcategory_id, req.body.food_id, req.body.ingridients, req.body.price, req.body.offer_price, req.body.status, req.body.food_type, req.body.taste, req.file.filename],function(error,result){
        if (error)
        {
            res.render('food_interface', { status: false, message: 'Fail to submit record.....' })
        }
        else
        {
            res.render('food_interface', { status:true, message: 'Record submitted succesfully......'})
        }
    })
})
router.get("/displayall_data",function(req,res,next){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
        {
    pool.query("select f.*,(select c.category_name from category c where c.category_id=f.category_id)as category_name,(select s.subcategory_name from subcategory s where s.subcategory_id=f.subcategory_id)as subcategory_name,(select fi.food_name from food_item fi where fi.food_id=f.food_id)as food_name from food_data f",function(error,result){
        // console.log(result)
        if(error)
        {
            res.render("displayall_data",{data:[]})
        }
        else
        {
            res.render("displayall_data",{data:result})
        }
        
    })
}else
res.render('login',{message:''})
}
catch(e)
{
    res.render('login',{message:''})
}
})
router.get("/edit_details",function(req,res,nest){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
        {
    pool.query("select f.*,(select c.category_name from category c where c.category_id=f.category_id)as category_name,(select s.subcategory_name from subcategory s where s.subcategory_id=f.subcategory_id)as subcategory_name,(select fi.food_name from food_item fi where fi.food_id=f.food_id)as food_name from food_data f where f.fooddata_id=?",[req.query.foodid],function(error,result){
        if(error)
        {
            res.render("edit_details",{data:[]})
        }
        else
        {   //console.log(result)
            res.render("edit_details",{data:result[0]})
        }
    })
 } else
    res.render('login',{message:''})
    }
    catch(e)
    {
        res.render('login',{message:''})
    }
})
router.post("/edit_delete",function(req,res,next){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
        {
    if(req.body.btn=="edit")
    {
        pool.query("update food_data set category_id=?, subcategory_id=?, food_id=?, ingridients=?, price=?, offer_price=?, status=?, food_type=?, taste=? where fooddata_id=?",[req.body.category_id, req.body.subcategory_id, req.body.food_id, req.body.ingridients, req.body.price, req.body.offer_price, req.body.status, req.body.food_type, req.body.taste,req.body.foodid],function(error,result){
            if(error)
            {
                res.redirect("/food/displayall_data")
            }
            else
            {
                res.redirect("/food/displayall_data")
            }  
        })
    }
    else
    {
        pool.query("delete from food_data where fooddata_id=?", [req.body.foodid],function(error,result){
            if(error)
            {
                res.redirect("/food/displayall_data")
            }
            else
            {
                res.redirect("/food/displayall_data")
            }  
        })
    }
} else
res.render('login',{message:''})
}
catch(e)
{
    res.render('login',{message:''})
}
})
router.get("/edit_image",function(req,res,next){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
    res.render("edit_image",{data:req.query})
 else
res.render('login',{message:''})
}
catch(e)
{
    res.render('login',{message:''})
}
})
router.post("/update_image",upload.single('picture'),function(req,res,next){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
        {
    if(req.body.btn=="edit")
    {
        pool.query("update food_data set picture=? where fooddata_id=?",[req.file.filename,req.body.foodid],function(error,result){
            if(error)
            {
                res.redirect("/food/displayall_data")
            }
            else
            {
                res.redirect("/food/displayall_data")
            }  
        })
    }
    else
    {
        res.redirect("/food/displayall_data")
    }
 } else
    res.render('login',{message:''})
    }
    catch(e)
    {
        res.render('login',{message:''})
    }
})
router.get('/display_by_id',function(req,res,next){
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
    res.render('display_by_id',{message:''})
    else
    res.render('login',{message:''})
    }
    catch(e)
    {
        res.render('login',{message:''})
    }
})

module.exports=router