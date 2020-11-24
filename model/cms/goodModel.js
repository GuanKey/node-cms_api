const mogoose=require('mongoose')

module.exports=mogoose.model('goods',mogoose.Schema({
    name:String,
    desc:String,
    price:Number,
    cate:String,
    img:String,
    hot:Boolean,
    rank:Number,
    create_time:Number
}))