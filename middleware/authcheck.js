var jwt = require('jsonwebtoken')
const User=require("../mongoSchema/userSchema")

// const authcheak=(req,res,next)=>{
//         const token=req.header('token');
//         console.log(
//             "kgjgjk "
//         );
//         console.log("kghg ---> "+token);
//         if(token==null){
//             res.status(300).json({ error: "Unauthorized User"  })
//         }
//         else{
//         const verifiedtoken=jwt.verify(token,process.env.SECRET_KEY);
//         req.user = verifiedtoken._id;
//         if(verifiedtoken){
//             next()
//         }
//         else{
//             res.status(300).json({ error: "Unauthorized User"  })
//         }
//         }
        
// }
const authcheak = (permissions) => {
    return (req,res,next)=>{
            
        const token=req.header('token');
        // const role = 'user'
        // // req.header('role');
        console.log(
            permissions
        );
        console.log("kghg ---> "+token);
        if(token==null){
            return res.status(300).json({ error: "Unauthorized User"  })
        } else {
            const verifiedtoken=jwt.verify(token,process.env.SECRET_KEY);
            req.user = verifiedtoken._id;
            const role = verifiedtoken._role;
            if(permissions.includes(role)){
                if (verifiedtoken) {
                    next()
                } else {
                    return res.status(300).json({ error: "Unauthorized User"  })
                }
            } else {
                return res.status(300).json({ error: "Unauthorized User"  })
            }
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