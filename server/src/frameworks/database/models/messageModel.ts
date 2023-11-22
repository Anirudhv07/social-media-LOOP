import { Schema,model } from "mongoose";
import User from "./userModel";
import Chat from "./chatModel";



const messageSchema=new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:'Chat'
    }
},{
    timestamps:true
})

const Message = model('Messages',messageSchema,'messages')
export default Message