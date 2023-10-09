import express from "express"
import userController from "../../../adapters/controllers/userController"
import { userRepository } from "../../database/repository/userRepository"
import { userRepositoryInterface } from "../../../application/repositoryInterface/userRepositoryInterface"
import { uploadProfilePic } from "../middleware/cloudinaryMiddleware"

const userRouter=()=>{

const router=express.Router()

const controller=userController(userRepository,userRepositoryInterface)

router.post('/myProfile',controller.myProfileDetails)

router.post('/updateProPic',uploadProfilePic,controller.updateProPic)





return router

}
export default userRouter