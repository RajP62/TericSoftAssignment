import {Schema, model} from "mongoose";

const historySchema = Schema({
    height: {type:Number, required: true},
    weight: {type:Number, required: true},
    bmi: {type:Number, required: true},
    userId: {type:Schema.Types.ObjectId, required: true}
});

export default new model("history", historySchema);