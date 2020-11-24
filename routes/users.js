const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("../utils/jwt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 注册
router.post("/cms/regist", function (req, res, next) {
  let { username, password, password2 } = req.body;

  if (password !== password2) {
    return res.json({ err: 1, msg: "两次密码不同" });
  }
  userModel.find({ username }).then((arr) => {
    if (arr.length > 0) {
      res.json({ err: 1, msg: "当前用户名已注册" });
    } else {
      let user = {
        username,
        password,
        create_time: Date.now(),
      };
      userModel.insertMany([user]).then(() => {
        res.json({ err: 0, msg: "注册成功" });
      });
    }
  });
});

// 登陆
router.post("/cms/login", function (req, res, next) {
  let { username, password } = req.body;

  userModel.find({ username }).then((arr) => {
    if (arr.length > 0 && arr[0].password == password) {
      let data = {
        err: 0,
        msg: "登陆成功",
        data: { token: jwt.createToken({ username, password }) },
      };
      res.json(data);
    } else {
      res.json({ err: 1, msg: "登陆失败，用户名或密码错误" });
    }
  });
});

module.exports = router;
