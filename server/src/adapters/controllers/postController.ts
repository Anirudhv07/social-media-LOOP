import express from "express"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"

import { postDBInterface } from "../../application/repositoryInterface/postRepositoryInterface"
import { postDBRepository } from "../../frameworks/database/repository/postRepository"
import { postData,allUserPost,likeFunctions, commentFuncion, getAllComment } from "../../application/useCases/post"


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
        const comment=req.body.comment  
        
        const response=await commentFuncion(userId,postId,comment,repository) 
        res.json(response) 

        
    }

    const allComment=async(req:Request,res:Response)=>{
        const postId=req.body.singlePostId  
        const response=await getAllComment(postId,repository)
        console.log(response,'klpiu');
        
        res.json(response)
        
    }
    return{
        postImage,
        getAllUserPost,
        likePost,
        addComment,
        allComment
    }
}

export default postController


