import Post from "../models/postModel"
import Comment from "../models/commentModel"
import mongoose from "mongoose"



export const postRepository =()=>{
    const addUserPost=async(imgVideoURL:string,description:string,postedUser:string)=>{
        const post={
            imgVideoURL,
            description,
            postedUser
        }
        const newPost = new Post(post)
        return await newPost.save()
    }
   
    const allUserPost=async(userId:string)=>{
        return await Post.find({postedUser:userId}).sort({createdAt:-1})
        
        
    }
    const likeFunction=async(userId:string,postId:string)=>{
        try{
            const likeStatus= await Post.findOne({_id:postId,like:{$in:userId}})
            if(likeStatus===null){
    
                const response=await Post.updateOne({_id:postId},{$addToSet:{like:userId}})
                if(response.matchedCount==1){
    
                    return true
                }
            }else{
                const response= await Post.updateOne({_id:postId},{$pull:{like:userId}})
                if(response.matchedCount==1){
    
                    return false
                }
            } 

        }catch(err:any){
            console.log(err);
            
        }
        
    }

    const commentFunction=async(commentedUser:string,postId:string,comment:string,replyCommentId:string,replyToUser:string,replyToUserName:string,userProPic:string)=>{
      if(replyCommentId){
        const comments= comment.replace(`@${replyToUserName}`,``)
        const replyComment={
          comment:comments,
          commentedUser,
          replyToUser,
          replyToUserName,
          userProPic,
          postId,
          liked:[],
          reports:[],
          listed:true,
          createdAt:new Date()
        }
 console.log(replyComment,'replyyyy');
 
        const response=await Comment.updateOne({_id:replyCommentId},{$push:{reply:replyComment}})
        if(response){
          return replyComment
        }

      }else{

        const newComment={
            commentedUser,postId,comment
        }
        const addComment=new Comment(newComment)
        return await addComment.save()
      }
    }

    const getAllComments=async(userPostId:string)=>{
        const postID=new mongoose.Types.ObjectId(userPostId)
        
        return await Comment.aggregate([
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  postId:postID,
                },
            },
            {
              $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                  userId: {
                    $toObjectId: "$commentedUser",
                  },
                },
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "users",
                  localField: "userId",
                  foreignField: "_id",
                  as: "userDetails",
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$userDetails",
                },
            },
          ])

        

        
        
        
    }

    return{
        addUserPost,
        allUserPost,
        likeFunction,
        commentFunction,
        getAllComments
    }
}

export type postDBRepository=typeof postRepository
