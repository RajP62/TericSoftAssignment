import app from "./index.js";
import dbConnect from "./configs/db.js";
const PORT = process.env.PORT || 4000;


app.listen(PORT, async ()=>{
    try{
      await dbConnect();
    console.log(`Server is running on port ${PORT}`);
    }
    catch(e){
      console.log(e.message);
    }
})  