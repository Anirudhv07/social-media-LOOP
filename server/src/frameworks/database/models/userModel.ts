import { Schema,model } from "mongoose";

const userSchema= new Schema(
    {
        firstName:{
            type:String,
            default:""
        },
        lastName:{
            type:String,
            default:""
        },
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,

        },
        profilePic:{
            type:String,
            default:''
        },
        bio:{
            type:String,
        },
        gender:{
            type:String
        },
        city:{
            type:String
        },
        phoneNumber:{
            type:Number
        },
        isBlocked:{
            type:Boolean,
            default:false
        },
        followers:{
            type:Array
        },
        following:{
            type:Array
        },
        blockedUsers:{
            type:Array
        },
        createdAt: {
            type: Date,
            default: Date.now, // Set a default value to the current date and time
          },
          updatedAt: {
            type: Date,
            default: Date.now, // Set a default value to the current date and time
          }
    }
)


const User = model('User',userSchema,'users')

export default User