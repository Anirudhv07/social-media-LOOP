import express from "express"
import userAuthController from "../../../adapters/controllers/userAuthController"
import {userRepository} from "../../database/repository/userAuthRepository"
import { userRepositoryInterface } from "../../../application/repositoryInterface/userAuthRepositoryInterface"
import { authServices } from "../../services/authService"
import { authServiceInterface } from "../../../application/service/authServiceInterface"



const authRouter=()=>{
  
    
    const  router=express.Router()
    const controller=userAuthController(userRepository,userRepositoryInterface,authServices,authServiceInterface)
    
    router.post('/addUser',controller.addUser)

    router.post('/logIn',controller.logIn)

    router.post('/googleLogIn',controller.googleUserLogIn)

    router.post('/googleSignUp',controller.googleSignUp)




    return router
}

export default authRouter