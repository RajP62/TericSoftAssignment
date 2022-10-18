export default (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.send({error:true, message: "Please enter all credentials valid"});
    }
    if(!email.includes(".com")){
        return res.send({error: true, message: "Please enter a valid email"});
    }
    if(password.length<6){
        return res.send({error: true, message: "Password length should be atleast 6"});
    }
    next();
}