import { postDBInterface } from "../repositoryInterface/postRepositoryInterface";

export const postData=async(imageURL:any,description:string,userId:string,repostitory:ReturnType<postDBInterface>)=>{

    return await repostitory.userPostData(imageURL,description,userId)

}

export const allUserPost=async(userId:any,repository:ReturnType<postDBInterface>)=>{
    return await repository.getAllUserPost(userId)
}

export const likeFunctions=async(userId:string,postId:string,repository:ReturnType<postDBInterface>)=>{
    return await repository.likePost(userId,postId)
}

export const commentFuncion=async(userId:string,postId:string,comment:string,replyCommentId:string,replyToUser:string,replyToUserName:string,userProPic:string,repository:ReturnType<postDBInterface>)=>{
    return await repository.addComment(userId,postId,comment,replyCommentId,replyToUser,replyToUserName,userProPic)
}

export const getAllComment=async(postId:string,repository:ReturnType<postDBInterface>)=>{

    return await repository.allComments(postId)
}