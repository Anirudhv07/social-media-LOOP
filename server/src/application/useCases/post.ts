import { postDBInterface } from "../repositoryInterface/postRepositoryInterface";

export const postData=async(imageURL:any,description:string,userId:string,repostitory:ReturnType<postDBInterface>)=>{

    return await repostitory.userPostData(imageURL,description,userId)

}

export const allUserPost=async(userId:any,repository:ReturnType<postDBInterface>)=>{
    return await repository.getAllUserPost(userId)
}