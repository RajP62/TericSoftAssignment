import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";
import crypto from "node:crypto";
import {pbkdf2Sync } from "crypto";
import fs from 'fs';
import validateCredentials from "../middlewares/validateCredentials.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authenticate } from "../middlewares/authenticate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.post("/", validateCredentials, async (req, res)=>{
    try{
        const image = req.files?.image;
        let {name, email, password} = req.body;
        password= pbkdf2Sync(password, process.env.HASH_SECRET, 60, 60, "sha256").toString("hex");
        if(!image){
            return res.send({error: true, message: "Kindly submit a valid image"});
        }
        console.log(image);
        const picturePath = path.join(__dirname, "../..", "files", `${Date.now()}${Math.random(1, 1000000000)}${image.name}`);
        const data = await new Promise((resolve, reject)=>{
            image.mv(picturePath, function(error){
                if(error){
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
            return res.send({error: true, message: "User already exists with this email"});
        }

        const user = new User({picture: picturePath, name, email, password});

        user.save().then(()=>{
            return res.send({error: false, message: "User registered successfully"});
        }).catch(e=>{
           return res.send({error: true, message: e.message});
        });

    }
    catch(e){
        return res.send({error: true, message: e.message});
    }
});

router.post("/login",async (req, res)=>{
    try{
        let {email, password} = req.body;
        if(!email || !password){
            return res.send({error: true, message: "Please enter a valid email and password"});
        }
        const user = await User.find({email});
        if(!user[0]){
            return res.send({error: true, message: "User doesn't exist with this email"});
        }
        password = pbkdf2Sync(password, process.env.HASH_SECRET, 60, 60, "sha256").toString("hex");

        const {id, picture, name, email:userEmail} = user[0];
        console.log(password, user.password);
        if(password!==user[0].password){
            return res.send({error: true, message: "Password doesn't match"});
        }

        const access = jwt.sign({id, picture, name, email: userEmail}, process.env.JWT_KEY, {expiresIn: "10m"});
        
        const refresh = jwt.sign({id, picture, name, email: userEmail}, process.env.JWT_REFRESH_SECRET, {expiresIn: "6d"});

        res.cookie("access", access, {sameSite:"none", secure: true, expires: new Date(Date.now()+ 600000+864000000)});
        res.cookie("refresh", refresh, {sameSite:"none", secure: true, expires: new Date(Date.now()+ 518400000+864000000)});

        return res.send({error: false, name, message: "User logged in successfully"});

    }
    catch(e){
        return res.send({error: false, message: e.message});
    }
});

router.get("", authenticate, async (req, res)=>{
    try{
        return res.send({user: req.user});
    }
    catch(e){
        return res.send({error: false, message: "Something went wrong"});
    }
});

router.post("/logout", (req, res)=>{
    try{
        res.clearCookie("access", {path:"/"});
        res.clearCookie("refresh", {path:"/"});
        res.send({error: false, message:"User logged out successfully"});
    }
    catch(e){
        res.send({error: true, message: "Something went wrong"});
    }
});

router.get("/refresh", async(req, res)=>{
    try{
        const token = req.cookies?.refresh;
        if(!token){
            return res.send({error: true, message: "Refresh token doesn't exist"});
        }
        let decoded;
        try{
            jwt.verify(token, process.env.JWT_REFRESH_SECRET, function(err, resp){
                if(err) return res.send({error: true, message: "Invalid refresh token"});
                decoded=resp;
            });
        }
        catch(e){
            return res.send({error: true, message: `error is ${e.message}`});
        }
        const {id, picture, name, email} = decoded;

        const access_jwt = jwt.sign({id, picture, name, email}, process.env.JWT_KEY, {expiresIn: "10m"});
        res.cookie("access", access_jwt, { expires: new Date(Date.now()+ 600000+864000000)});
        return res.send({error: false, message: "Access token sent successfully"});
    }
    catch(e){
        return res.send({error: true, message: "Something went wrong"});
    }
})


export default router;