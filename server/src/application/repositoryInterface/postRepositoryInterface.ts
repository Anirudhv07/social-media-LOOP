import { postDBRepository } from "../../frameworks/database/repository/postRepository";

export const postRepositoryInterface=(repository:ReturnType<postDBRepository>)=>{
    
    const userPostData= async(imageURL:string,description:string,userId:string)=>{
        return await repository.addUserPost(imageURL,description,userId)

    }
    const getAllUserPost=async(userId:string)=>{
        return await repository.allUserPost(userId)
    }
    return{
        userPostData,
        getAllUserPost
    }
}

export type postDBInterface=typeof postRepositoryInterface