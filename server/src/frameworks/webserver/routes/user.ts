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

router.get('/allUsers',controller.getAllUser)

router.post('/followUnfollow',controller.followUnfollow)

router.post('/followingList',controller.followingList)

router.post('/followerList',controller.followerList)

router.post('/followersPost',controller.followersPost)

router.post('/editProfile',controller.editProfile)

router.post('/searchUser',controller.findUser)












return router

}
export default userRouter