import express from "express";
const router = express.Router();
import path from "path";
import crypto from "node:crypto";
import {pbkdf2Sync } from "crypto";
import fs from 'fs';
import validateCredentials from "../middlewares/validateCredentials.js";
import User from "../models/user.model.js";

router.post("/", validateCredentials, async (req, res)=>{
    try{
        const image = req.files?.image;
        let {name, email, password} = req.body;
        password= pbkdf2Sync(password, process.env.HASH_SECRET, 60, 60, "sha256").toString("hex");
        const type = path.extname(image.name?.toLowerCase());
        if(!image || (type!=="png" && type!=="jpeg" && type!=="jpg")){
            return res.send({error: true, message:"Kidly submit a vaild image"});
        }

        const picturePath = path.join(__dirname, "files", image.name);
        const data = await new Promise((resolve, reject)=>{
            image.mv(picturePath, function(error){
                if(err){
                    reject(error);
                }
                else{
                    resolve({error: false, message:'Image uploaded successfully'});
                }
            })
        });
        if(data.error){
            return res.send({error: true, message: data.error.message});
        }

        const existingUser = await User.find({email});
        if(existingUser[0]){
            return res.send({error: true, message: "User already exists"});
        }

        return res.redirect("")

    }
    catch(e){
        return res.send({error: false, message: e.message});
    }
});


export default router;