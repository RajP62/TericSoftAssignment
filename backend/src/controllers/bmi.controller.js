import express from "express";
const router = express.Router();
import {authenticate} from "../middlewares/authenticate.js";
import {calculateBmi} from "../features/calculateBmi.js";
import History from "../models/history.model.js"
import app from "../index.js";

router.post("/calculate", authenticate,  async(req, res)=>{
    try{
        const {height, weight} = req.body;
        if(!height || !weight){
            return res.send({error: true, message: "Please enter valid height and weight"});
        }
        const bmi = calculateBmi(height, weight);
        const history = new History({userId: req.user?.id, height, weight, bmi});
        history.save().then(()=>{
            return res.send({error: false, bmi});
        }).catch(e=>{
            return res.send({error: true, message: e.message});
        });
    }
    catch(e){
        return res.send({error: true, message:"Something went wrong"});
    }
});

router.get("/history", authenticate, async (req, res)=>{
    try{
        const id = req.user?.id;
        const history = await History.findById(id);
        history.save().then(()=>{
            return res.send({error: true, history});
        }).catch(e=>{
            return res.send({error: true, message: e.message});
        })
    }
    catch(e){
        return res.send({error: true, message: "Something went wrong"});
    }
})

export default router;