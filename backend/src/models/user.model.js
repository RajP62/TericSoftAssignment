import {Schema, model} from "mongoose";

const userSchema = Schema({
    picture: {type:String, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true}
});

export default new model("user", userSchema);