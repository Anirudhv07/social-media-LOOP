import { postDBRepository } from "../../frameworks/database/repository/postRepository";

export const postRepositoryInterface=(repository:ReturnType<postDBRepository>)=>{
    
    const userPostData= async(imageURL:string,description:string,userId:string)=>{
        return await repository.addUserPost(imageURL,description,userId)

    }
    const getAllUserPost=async(userId:string)=>{
        return await repository.allUserPost(userId)
    }
    const likePost=async(userId:string,postId:string)=>{
        const response= await repository.likeFunction(userId,postId)
        return response  
    }
    const addComment=async(userId:string,postId:string,comment:string,replyCommentId:string,replyToUser:string,replyToUserName:string,userProPic:string)=>{
        return await repository.commentFunction(userId,postId,comment,replyCommentId,replyToUser,replyToUserName,userProPic)  
    }
    const allComments=async(postId:string)=>{
        
        return await repository.getAllComments(postId)  
    }
    const deleteComment=async(commentId:string)=>{
        
        return await repository.deleteThisComment(commentId)  
    }
    return{
        userPostData,
        getAllUserPost,
        likePost,
        addComment,
        allComments,
        deleteComment
    }
}

export type postDBInterface=typeof postRepositoryInterface