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
        console.log(response,'respppppp');
        
    }catch(error:any){
        console.log(error);
        
    }
}


export const getAllPost=async(userId:string)=>{
    const response=await apiURL.post('/post/allPost',{userId})
    return response?.data
    
}






