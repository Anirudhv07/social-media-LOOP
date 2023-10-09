import Post from "../models/postModel"



export const postRepository =()=>{
    const addUserPost=async(imgVideoURL:string,description:string,postedUser:string)=>{
        const post={
            imgVideoURL,
            description,
            postedUser
        }
        const newPost = new Post(post)
        return await newPost.save()
    }
   
    const allUserPost=async(userId:string)=>{
        return await Post.find({postedUser:userId})
        
        
    }

    return{
        addUserPost,
        allUserPost
    }
}

export type postDBRepository=typeof postRepository
