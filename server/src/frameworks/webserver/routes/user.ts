import express from "express"
import userController from "../../../adapters/controllers/userController"
import { userRepository } from "../../database/repository/userRepository"
import { userRepositoryInterface } from "../../../application/repositoryInterface/userRepositoryInterface"

const userRouter=()=>{

const router=express.Router()

const controller=userController(userRepository,userRepositoryInterface)

router.post('/myProfile',controller.myProfileDetails)


return router

}
export default userRouter