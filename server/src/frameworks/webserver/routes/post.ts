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

router.post('/likePost',controller.likePost)

router.post('/addComment',controller.addComment)

router.post('/getAllComments',controller.allComment)



    

return router
}

export default postRouter