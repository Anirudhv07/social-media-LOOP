import express from "express";
import { uploadPostImg } from "../middleware/cloudinaryMiddleware";
import postController from "../../../adapters/controllers/postController";
import { postRepository } from "../../database/repository/postRepository";
import { postRepositoryInterface } from "../../../application/repositoryInterface/postRepositoryInterface";

const postRouter=()=>{

    const router=express.Router()

    const controller=postController(postRepositoryInterface,postRepository)

router.post('/postImg',uploadPostImg,controller.postImage)

router.post('/allPost',controller.getAllUserPost)
    

return router
}

export default postRouter