const express = require("express");
var flash = require("connect-flash");
const { authcheak } = require("../middleware/authcheck");
const User = require("../mongoSchema/userSchema");
const router = express.Router();

router.put("/user/edit", authcheak, async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.user }, req.body);
    req.flash("editmsg", "post updated successfully");
    res.status(200).send({ msg: "success" });
  } catch (err) {
    req.flash("editmsg", "post update failed");
    res.status(200).send({ msg: err.message });
  }
});


// router.get("/post/:tagtId", authcheak, async (req, res) => {
router.get("/user", authcheak, async (req, res) => {
  try {
    console.log(
      "yyfgk "
  );
    console.log(req.user);
    const post = await User.findOne({ _id: req.user }).select('-password').select('-token');
    res.status(200).send({ code: "success", data: post });
  } catch (err) {
    req.flash("editmsg", "post update failed");
    res.status(200).send({ msg: err.message });
  }
});


router.get("/users", authcheak, async (req, res) => {
  try {
    console.log(
      "yyfgk "
  );
    console.log(req.user);
    const post = await User.find().select('-password').select('-token');
    res.status(200).send({ code: "success", data: post });
  } catch (err) {
    req.flash("editmsg", "post update failed");
    res.status(200).send({ msg: err.message });
  }
});



module.exports = router;
