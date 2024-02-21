const express = require("express");
const mongoose = require("mongoose");
// const { authcheak, authcheakForsignin } = require("../middleware/authcheak");
const User = require("../mongoSchema/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();

// router.get("/test", (req, res) => {
//         console.log("testing");
//           res.json({ msg: "user registered succesfully" });
// });

router.post("/register", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const new_user = new User(req.body);
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.json({ msg: "user already exist" });
      } else {
        new_user.save().then(async (result) => {
          const user = await User.findOne({ email: req.body.email });
          //jwt token creation
          const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
          user.token = token;
          user.save().then((r) => {
            console.log("user updated");
          });

          res.json({ msg: "user registered succesfully" });
        });
      }
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
});

// router.post("/signin", authcheakForsignin, async (req, res) => {
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!!user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    //   res.cookie("jwtoken", token, { expires: false, httpOnly: true });
      // res.cookie("jwtoken", token, { expires: false, httpOnly: true });
      res.status(200).json({
         msg: "Successful login" ,
         token: token,
        });
      

    //   req.flash("postmsg", "you logged in succesfully");
    //   res.redirect("/pages/createpost");
    } else {
    //   req.flash("loginmsg", "invalid credentials");
    //   res.redirect("/pages/login");
        res.json({ msg: "wrong credentials" });

    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        const password = Math.random()                        // Generate random number, eg: 0.123456
        .toString(36)           // Convert  to base-36 : "0.4fzyo82mvyr"
                     .slice(-8)// Cut off last 8 characters : "yo82mvyr"
        const enPassword = bcrypt.hashSync(
                     password, 10);
        
        user.password = enPassword;
        await user.save()
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            },
        });

        const mail = {
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: "Reset Password",
            text: `Your new password is : ${password}"`

        }

        transporter.sendMail(mail).then(()=>{

            return res.status(200).json({message: 'Password is updated. Check your registered mail'})
        }
            )
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal Error'})

    }
})

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
//   res.redirect("/pages/login");
});

router.post("/verfication", async (req, res) => {
  const token=req.header('token');
    console.log(
        "kgjgjk "
    );
    console.log("kghg ---> "+token);
    if (token==null) {
        res.status(300).json({ error: "Unauthorized User"  })
    } else {
        const verifiedtoken=jwt.verify(token,process.env.SECRET_KEY);
        if(verifiedtoken){
            res.status(200).json({
              msg: "Token Verfication Successful" 
            });
        }
        else{
            res.status(300).json({ error: "Unauthorized User"  })
        }
      }
});

module.exports = router;
