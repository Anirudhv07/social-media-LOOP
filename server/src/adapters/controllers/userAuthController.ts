import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { userDBInterface } from "../../application/repositoryInterface/userAuthRepositoryInterface"
import { userDBRepository } from "../../frameworks/database/repository/userAuthRepository"
import {registerUser,gooSignUp} from "../../application/useCases/userAuth/register"
import { logInUser , googleLogIn} from "../../application/useCases/userAuth/login"
import { AuthServices } from "../../frameworks/services/authService"
import { AuthServicesInterface } from "../../application/service/authServiceInterface"



const userAuthController = (
    userRepository: userDBRepository, 
    userRepositoryInterface: userDBInterface, 
    authServices: AuthServices, 
    authServiceInterface: AuthServicesInterface
) => {


    const repository = userRepositoryInterface(userRepository())
    const authService = authServiceInterface(authServices())
    
    


    const addUser = asyncHandler(async (req: Request, res: Response) => {
        console.log("it is reaching");
        
        
        const {firstName,lastName,userName,email,gender,password, phoneNumber } = req.body
        console.log(req.body)
        const user = { firstName,lastName,userName,gender,email,password, phoneNumber}
        const userData = await registerUser(user, repository,authService)
        res.json(userData)
    })

    const logIn =asyncHandler(async(req: Request,res: Response)=>{
        const {email,password}=req.body
        const user={email,password}
        const userData = await logInUser(user,repository,authService)
        res.json(userData)

    })

    const googleUserLogIn =asyncHandler(async(req: Request,res: Response)=>{
       
        
        const email=req.body.values
        const userData = await googleLogIn(email,repository,authService)
        res.json(userData)

    })

    const googleSignUp = asyncHandler(async (req: Request, res: Response) => {
       
        
        
        const {userName,email } = req.body
      
        const user = { userName,email}
        const userData = await gooSignUp(user, repository,authService)
        
        
        res.json(userData)
    })

    return {
        addUser,
        logIn,
        googleUserLogIn,
        googleSignUp
    }
}

export default userAuthController