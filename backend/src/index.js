import express from "express";
import cookieparser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import dotenv from "dotenv";
import originControl from "./middlewares/originControl.js";

// Controllers 
import userController from "./controllers/user.controller.js";
import bmiController from "./controllers/bmi.controller.js";
import { authenticate } from "./middlewares/authenticate.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(expressFileUpload());
app.use(originControl);
app.get("/check", authenticate, (req, res)=>{
    // This route is just to check whether the user is authenticated or not
    return res.send({error: false, message:"User is authenticated"});
})
app.use("/user", userController);
app.use("/bmi", bmiController);

export default app;