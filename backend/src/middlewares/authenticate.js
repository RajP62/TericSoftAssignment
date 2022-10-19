import jwt from "jsonwebtoken";
export const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_KEY, function(err, decode){
            if(err){
                reject(err.message);
            }
            resolve(decode);
        })
    });
}

export const authenticate = async (req, res, next)=>{
    const access = req.cookies?.access;
    let user;
    try{
        user = await verifyToken(access);
    }
    catch(e){
        return res.send({error: true, message: e.message});
    }

    req.user= user;
    next();
}
