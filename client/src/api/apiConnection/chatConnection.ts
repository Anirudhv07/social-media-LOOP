import apiURL from "../axiosUser";


export const getChat=async(senderId:string,loggedUser:string)=>{

    const data={
        senderId,loggedUser
    }
    const response=await apiURL.post('/chat/',data)
    return response.data
    
}

export const getAllChat=async(senderId:string)=>{
    
    const response=await apiURL.get('/chat/',{params:{senderId:senderId}})
    return response.data
    
}
