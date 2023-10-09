import apiURL from "../axiosUser";



export const getMyProfile=async(userId:string)=>{
    try{
        const response= await apiURL.post('/user/myProfile',{userId})
        return response?.data
        
        
    }catch(error:any){
        console.log(error);
        
    }
}

export const changeProPic=async(profilePic:File,userId:string)=>{
    try{
    console.log(profilePic,'imggg');
    
    const form=new FormData
    form.append('profilePic',profilePic)
    form.append('userId',userId)


    console.log(form,"imgFileeee");
    
    const response=await apiURL.post('/user/updateProPic',form)
    console.log(response,'prpppp');
    return response.data
    
}catch(error:any){
    console.log(error);
    
}
}

