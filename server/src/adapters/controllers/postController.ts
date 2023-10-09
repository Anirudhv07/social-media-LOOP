import express from "express"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"

import { postDBInterface } from "../../application/repositoryInterface/postRepositoryInterface"
import { postDBRepository } from "../../frameworks/database/repository/postRepository"
import { postData,allUserPost } from "../../application/useCases/post"


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
    return{
        postImage,
        getAllUserPost
    }
}

export default postController


