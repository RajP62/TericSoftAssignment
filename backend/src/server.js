import app from "./index.js";
const PORT = process.env.PORT || 4000;


app.listen(PORT, ()=>{
    try{
    console.log(`Server is running on port ${PORT}`);
    }
    catch(e){
      console.log("Something went wrong");
    }
})  