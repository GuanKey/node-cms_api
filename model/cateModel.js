const mongoose=require('mongoose')

module.exports=mongoose.model('cates',mongoose.Schema({
    cate:String,
    cate_zh:String,
    create_time:Number
}))