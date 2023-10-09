import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { userDBInterface } from "../../application/repositoryInterface/userRepositoryInterface"
import { userDBRepository } from "../../frameworks/database/repository/userRepository"
import { myProfie } from "../../application/useCases/user"
import { updateProfilePic } from "../../application/useCases/user"

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

    const updateProPic=asyncHandler(async(req:Request,res:Response)=>{
        if(req.file){

            const imageURL=req.file?.path.split('/image-')[1]
            const userId=req.body.userId
            
            console.log(req.file,imageURL,'iemmmmmmmmmmmm');
            
            await updateProfilePic(userId,imageURL,repository).then(()=>{
                res.status(200).json({ status: 'Success',data: imageURL })
            })
        }else{
            res.status(400).json({ status: 'No file Uploaded' })
            
        }
        
    })


    
 
return{
    myProfileDetails,
    updateProPic
  
}
}

export default userController