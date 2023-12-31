import apiURL from "../axiosUser";

interface postImage{
    description:string,
    postImg:File
}

export const postImg=async(values:postImage,userId:string)=>{
    try{

        console.log(values,'lplp');
        
        
        const form = new FormData
        form.append('postImage',values.postImg)
        form.append('description',values.description)
        form.append('userId',userId)

        const response= await apiURL.post('/post/postImg',form)
        if(response.status===200){
            return true
        }else{
            return false
        }
        
        
    }catch(error:any){
        console.log(error);
        
    }
}


export const getAllPost=async(userId:string)=>{
    const response=await apiURL.post('/post/allPost',{userId})
    return response?.data
    
}


export const likeFunction=async(userId:string,postId:string)=>{
    const data={
        userId,
        postId
    }
    const response=await apiURL.post('/post/likePost',data)
   console.log(response,'repphoh');
   
    return response?.data
    
}


export const addNewComment=async(postId:string,userId:string,commentText:string,commentID:string,replyToUser:string,replyToUserName:string,userProPic:string)=>{
    const datas={
        postId,userId,commentText,commentID,replyToUser,replyToUserName,userProPic
    }
    
    
    const response=await apiURL.post('/post/addComment',datas)
    
    return response?.data
}

export const getAllComment=async(singlePostId:string)=>{
    const response=await apiURL.post('/post/getAllComments',{singlePostId})

    return response.data
}

export const deleteThisComment=async(commentId:string)=>{
    
    
    const response=await apiURL.post('/post/deleteComment',{commentId})
    return response.data
    
}






