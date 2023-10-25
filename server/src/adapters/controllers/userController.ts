import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { userDBInterface } from "../../application/repositoryInterface/userRepositoryInterface"
import { userDBRepository } from "../../frameworks/database/repository/userRepository"
import { myProfie,updateProfilePic,allUsers,followUnfollowUser,myFollowingList,myFollowerList,myFollowersPost, editUserProfile } from "../../application/useCases/user"

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
            
            
            await updateProfilePic(userId,imageURL,repository).then(()=>{
                res.status(200).json({ status: 'Success',data: imageURL })
            })
        }else{
            res.status(400).json({ status: 'No file Uploaded' })
            
        }
        
    })


    const getAllUser=asyncHandler(async(req:Request,res:Response)=>{
        const response=await allUsers(repository)
        res.json(response)
        
    })

    const followUnfollow=asyncHandler(async(req:Request,res:Response)=>{
        const followerId=req.body.followerId
        const userId=req.body.userId
        
        const response=await followUnfollowUser(followerId,userId,repository)

        res.json(response)
        
        
        
    })

    const followingList=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        
        const response=await myFollowingList(userId,repository)

        res.json(response)
    }

    const followerList=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        
        const response=await myFollowerList(userId,repository)

        res.json(response)
    }

    const followersPost=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        
        const response=await myFollowersPost(userId,repository)

        res.json(response)
    }


    const editProfile=async(req:Request,res:Response)=>{
        const userId=req.body.userId
        const values=req.body.values
        
        
        const response=await editUserProfile(userId,values,repository)
        res.json(response)
        
    }
 
return{
    myProfileDetails,
    updateProPic,
    getAllUser,
    followUnfollow,
    followingList,
    followerList,
    followersPost,
    editProfile
  
}
}

export default userController