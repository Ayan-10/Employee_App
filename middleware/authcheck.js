var jwt = require('jsonwebtoken')
const User=require("../mongoSchema/userSchema")

const authcheak=(req,res,next)=>{
        const token=req.cookies.jwtoken;
        console.log("kgwskuw2"+token);
        if(token==null){
            res.status(300).json({ error: "Unauthorized User"  })
        }
        else{
        const verifiedtoken=jwt.verify(token,process.env.SECRET_KEY);
        if(verifiedtoken){
            next()
        }
        else{
            res.status(300).json({ error: "Unauthorized User"  })
        }
        }
        
}

const authcheakForsignin=(req,res,next)=>{
    const token=req.cookies.jwtoken;
    if(token!=null){
        res.status(300).json({ error: "Unauthorized User"  })
    }
    next();
}

module.exports={authcheak,authcheakForsignin}