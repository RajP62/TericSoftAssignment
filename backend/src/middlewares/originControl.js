export default function(req , res, next){
    res.header("Access-Control-Allow-Origin", "https://tericsoftassignment.vercel.app/");
    // res.header("Access-Control-Allow-Private-Network", true);
    // res.header("InsecurePrivateNetworkRequestsAllowed", true);
    next();
}