export default function(req , res, next){
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Private-Network", true);
    // res.header("InsecurePrivateNetworkRequestsAllowed", true);
    next();
}