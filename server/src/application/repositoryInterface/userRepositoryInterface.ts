import { userDBRepository } from "../../frameworks/database/repository/userRepository"


  
export const userRepositoryInterface=(repository:ReturnType<userDBRepository>)=>{

    const getByUserId=async(userId:string)=>{
        
        return await repository.getUserByUserId(userId)
    }

    const changeProPic=async(imgURL:string,userId:string)=>{
        return await repository.updateProPic(imgURL,userId)
    }

    const getAllUser=async()=>{
        return await repository.allUsers()
    }

    const followUnfollow=async(followerId:string,userId:string)=>{
        return await repository.followUnfollowUser(followerId,userId)
    }

    const followingList=async(userId:string)=>{
        return await repository.myFollowingList(userId)
    }

    const followerList=async(userId:string)=>{
        return await repository.myFollowerList(userId)
    }

    const followersPost=async(userId:string)=>{
        return await repository.myFollowersPost(userId)
    }

    return{
        getByUserId,
        changeProPic,
        getAllUser,
        followUnfollow,
        followingList,
        followerList,
        followersPost
    }

}


export type userDBInterface=typeof userRepositoryInterface