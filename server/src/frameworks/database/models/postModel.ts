import { Schema,model } from "mongoose";

const postSchema=new Schema({
    postedUser:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    imgVideoURL:{
        type:String,
        required:true
    },
    like:[],
    report:[]

},{timestamps:true})

const Post = model('Post',postSchema,'posts')
export default Post