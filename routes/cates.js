const express = require("express");
const router = express.Router();
const cateModel = require("../model/cateModel");
const goodModel = require("../model/cms/goodModel");

// 新增品类、编辑
router.post("/add", function (req, res, next) {
  let { id, cate, cate_zh } = req.body;
  let ele = {
    cate,
    cate_zh,
  };
  if (id) {
    cateModel.update({ _id: id }, { $set: ele }).then(() => {
      res.json({ err: 0, msg: "修改成功" });
    });
  } else {
    (ele.create_time = Date.now()),
      cateModel.insertMany([ele]).then(() => {
        res.json({ err: 0, msg: "success" });
      });
  }
});

// 获取所有品类
router.get("/all", function (req, res) {
  cateModel.find({}).then((arr) => {
    res.json({ err: 0, msg: "success", data: { list: arr } });
  });
});

// 获取品类详情
router.get("/detail", function (req, res) {
  let { id } = req.query;
  cateModel.find({ _id: id }).then((arr) => {
    res.json({ err: 0, msg: "success", data: arr[0] });
  });
});

// 删除品类
router.get("/remove/cate", function (req, res) {
  let { id } = req.query;
  cateModel.deleteMany({ _id: id }).then(() => {
    res.json({ err: 0, msg: "success" });
  });
});

module.exports = router;
