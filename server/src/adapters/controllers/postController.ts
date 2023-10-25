import express from "express"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"

import { postDBInterface } from "../../application/repositoryInterface/postRepositoryInterface"
import { postDBRepository } from "../../frameworks/database/repository/postRepository"
import { postData,allUserPost,likeFunctions, commentFuncion, getAllComment, deleteThisComment } from "../../application/useCases/post"


const postController=(postRepositoryInterface:postDBInterface,postRepository:postDBRepository)=>{
    const repository=postRepositoryInterface(postRepository())


    const postImage=asyncHandler(async(req:Request,res:Response)=>{
        const imageURL = req.file?.path.split('/post-')[1]
        const description = req.body.description
        const userId =req.body.userId
        // console.log(imageURL,description,userId);
        const response=await postData(imageURL,description,userId,repository)
        res.json(response)   
    })

    const getAllUserPost=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        const response=await allUserPost(userId,repository)

        res.json(response)
        

    }

    const likePost=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        const postId=req.body.postId        
        const response=await likeFunctions(userId,postId,repository)

        res.json(response)
        

    }

    const addComment=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        const postId=req.body.postId    
        const comment=req.body.commentText 
        const replyCommentId=req.body.commentID
        const replyToUser=req.body.replyToUser
        const replyToUserName=req.body.replyToUserName
        const userProPic=req.body.userProPic
        
        
        const response:any=await commentFuncion(userId,postId,comment,replyCommentId,replyToUser,replyToUserName,userProPic,repository) 
        if(response?.replyToUser){
            

            res.json({comment:false,response})
        }else{
            res.json({comment:true,response})
            
        }
    
        
    }

    const allComment=async(req:Request,res:Response)=>{
        const postId=req.body.singlePostId  
        
        const response=await getAllComment(postId,repository)
        
        res.json(response)
        
    }
    const deleteComment=async(req:Request,res:Response)=>{
        const commentId=req.body.commentId  
        const response=await deleteThisComment(commentId,repository)
        
        res.status(200).json({ status: 'Success' ,data:response})
        
    }
    return{
        postImage,
        getAllUserPost,
        likePost,
        addComment,
        allComment,
        deleteComment
    }
}

export default postController


