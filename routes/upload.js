var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var path = require("path");
var fs = require("fs");

// 图片上传和返回
router.post("/img", function (req, res, next) {
  // 创建一个实例
  var form = new multiparty.Form();
  // form.parse方法的作用：把req中的图片数据转存到服务器临时存储路径中去
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({ err: 1, msg: "图片上传失败" });
    } else {
      console.log(files);
      // 获取接受到的files对象中的file中的第0项
      const file = files.file[0];

      // 使用fs模块读取图片存储的临时路径
      let readStream = fs.createReadStream(file.path);

      let now = Date.now();
      // 设置图片存储路径，__dirname表示当前文件路径，到public/images，加上时间戳和文件名
      let p = path.join(
        __dirname,"../public/images/" + now + "-" + file.originalFilename
      );
      // 使用fs模块写入到服务器路径
      let writeStream = fs.createWriteStream(p);
      // 从临时路径，流向本地路径
      readStream.pipe(writeStream);

      // 流关闭时，触发回调函数
      writeStream.on("close", function () {
        // 把图片存好服务器后的静态路径返回会给前端
        let data = {
          url: `/images/${now}-${file.originalFilename}`,
        };
        res.json({ err: 0, msg: "图片上传成功", data });
      });
    }
  });
});

module.exports = router;
