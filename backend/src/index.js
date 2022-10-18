import express from "express";
import cookieparser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import dotenv from "dotenv";
import originControl from "./middlewares/originControl.js";

// Controllers 
import userController from "./controllers/user.controller.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(expressFileUpload());
app.use(originControl);

app.use("/user", userController);



export default app;