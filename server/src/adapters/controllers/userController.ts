import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { userDBInterface } from "../../application/repositoryInterface/userRepositoryInterface"
import { userDBRepository } from "../../frameworks/database/repository/userRepository"
import { myProfie } from "../../application/useCases/user"

const userController=(
    userRepository:userDBRepository,
    userRepositoryInterface:userDBInterface
)=>{

    const repository=userRepositoryInterface(userRepository())

    const myProfileDetails=asyncHandler(async(req:Request,res:Response)=>{
        const userId=req.body.userId
        const userData=await myProfie(userId,repository)
        
        res.json(userData)
        

    })
return{
    myProfileDetails
}
}

export default userController