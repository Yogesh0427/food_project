var express = require('express')
var router = express.Router()
var pool = require("./pool")

router.get('/fetchallcategory', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            res.status(500).json({ data: [], status: false, error })
        }
        else {
            res.status(200).json({ data: result, status: true })
        }
    })
})
router.get('/fetchallsubcategory', function (req, res, next) {
    pool.query("select * from subcategory where category_id=?",[req.query.category_id], function(error,result){
        if(error)
        {
            res.status(500).json({ data: [], status: false, error})
        }
        else
        {
            res.status(200).json({ data: result, status:true })
        }
    })
})
router.get('/fetchallfooditem', function(req,res,next){
    pool.query("select * from food_item where subcategory_id=?",[req.query.subcategory_id],function(error,result){
        if(error)
        {
            res.status(500).json({data:[],status:false,error})
        }
        else
        {
            res.status(200).json({data:result,status:true})
        }
    })
})
module.exports=router