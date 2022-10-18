import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default ()=>{
    return connect(process.env.MONGO_URL);
}