import User from "../models/userModel"



export const userRepository=()=>{

    const getUserByUserId=async(userId:string)=>{
        const user= await User.findOne({_id:userId})
        return user
    }

return{
    getUserByUserId
}
}
export type userDBRepository=typeof userRepository