const mongoose=require('mongoose')


module.exports=mongoose.model('ads',mongoose.Schema({
    text:String,
    img:String,
    create_time:Number
}))