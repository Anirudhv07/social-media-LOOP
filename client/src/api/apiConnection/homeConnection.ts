import apiURL from "../axiosUser";



export const getMyProfile = async (userId: string) => {
    try {
        const response = await apiURL.post('/user/myProfile', { userId })
        return response?.data


    } catch (error: any) {
        console.log(error);

    }
}

export const changeProPic = async (profilePic: File, userId: string) => {
    try {

        const form = new FormData
        form.append('profilePic', profilePic)
        form.append('userId', userId)



        const response = await apiURL.post('/user/updateProPic', form)
        return response.data

    } catch (error: any) {
        console.log(error);

    }
}

export const getAllUsers=async()=>{

    try{
        const response=await apiURL.get('/user/allUsers')
        return response.data
    }catch(err:any){
        console.log(err);
        
    }
}

export const followUnfollowUser=async(followerId:string,userId:string)=>{
    try{

        if(followerId===userId){
            return
        }else{

            const data={
                followerId,userId
            }
            
            
            const response=await apiURL.post('user/followUnfollow',data)
         
            
            return response.data
        }
        
    }catch(err:any){
        console.log(err);
        
    }
}

export const followingList=async(userId:string)=>{
    try{
        
        const response=await apiURL.post('user/followingList',{userId})
        return response.data
        
    }catch(err:any){
        console.log(err);
        
    }
}

export const followerList=async(userId:string)=>{
    try{
        
        const response=await apiURL.post('user/followerList',{userId})
        return response.data
        
    }catch(err:any){
        console.log(err);
        
    }
}

export const followersPost=async(userId:string)=>{
    try{
        
        const response=await apiURL.post('user/followersPost',{userId})
        
        
        return response.data
        
    }catch(err:any){
        console.log(err);
        
    }
}

export const editProfile=async(values:{},userId:string)=>{
    try{
        const data={
            values,userId
        }
        
        
        const response=await apiURL.post('user/editProfile',data)
        return response.data
        
    }catch(err:any){
        console.log(err);
        
    }
}


export const findUser=async(userName:string)=>{
    try{
        
        
        
        const response=await apiURL.post('user/searchUser',{userName})
        return response.data
        
    }catch(err:any){
        console.log(err);
        
    }
}
