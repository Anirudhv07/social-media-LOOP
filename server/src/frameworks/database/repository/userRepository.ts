import User from "../models/userModel"



export const userRepository=()=>{

    const getUserByUserId=async(userId:string)=>{
        const user= await User.findOne({_id:userId})
        return user
    }

    const updateProPic=async(imgURL:string,userId:string)=>{
        return await User.updateOne({_id:userId},{$set:{profilePic:imgURL}})
    }

return{
    getUserByUserId,
    updateProPic
}
}
export type userDBRepository=typeof userRepository