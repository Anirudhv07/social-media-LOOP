import { userDBInterface } from "../repositoryInterface/userRepositoryInterface";

export const myProfie = async (userId: string, repository: ReturnType<userDBInterface>) => {

    const response = await repository.getByUserId(userId)
    if (response) {
        response.password = ""
    }

    return response

}


export const updateProfilePic = async (userId: string, imgURL: any, repository: ReturnType<userDBInterface>) => {
    return await repository.changeProPic(imgURL,userId)
    
     
}

export const allUsers=async(repository:ReturnType<userDBInterface>)=>{
    return await repository.getAllUser()
     
}

export const followUnfollowUser=async(followerId:string,userId:string,repository:ReturnType<userDBInterface>)=>{
    return await repository.followUnfollow(followerId,userId)

}

export const myFollowingList=async(userId:string,repository:ReturnType<userDBInterface>)=>{
    return await repository.followingList(userId)
}

export const myFollowerList=async(userId:string,repository:ReturnType<userDBInterface>)=>{
    return await repository.followerList(userId)
}

export const myFollowersPost=async(userId:string,repository:ReturnType<userDBInterface>)=>{
    return await repository.followersPost(userId)
}

export const editUserProfile=async(userId:string,values:{firstName:string,
    lastName:string,
    userName:string,
    bio:string,
    email:string},repository:ReturnType<userDBInterface>)=>{
    return await repository.editProfile(userId,values)
}

export const searchUser=async(userName:string,repository:ReturnType<userDBInterface>)=>{
    return await repository.findUser(userName)
}

