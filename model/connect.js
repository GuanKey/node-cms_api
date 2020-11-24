const mogoose=require('mongoose')

mogoose.connect('mongodb://localhost/2002',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mogoose.connection;
db.on('open',function(){
    console.log('数据库连接成功')
})
db.on('error',function(){
    console.log('数据库连接失败')
})