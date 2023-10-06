import apiURL from "../axiosUser";


export const getMyProfile=async(userId:string)=>{
    try{
        const response= await apiURL.post('/user/myProfile',{userId})
        return response?.data
        
        
    }catch(error:any){
        console.log(error);
        
    }
}