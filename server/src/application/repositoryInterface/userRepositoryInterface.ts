import { userDBRepository } from "../../frameworks/database/repository/userRepository"


  
export const userRepositoryInterface=(repository:ReturnType<userDBRepository>)=>{

    const getByUserId=async(userId:string)=>{
        
        return await repository.getUserByUserId(userId)
    }

    const changeProPic=async(imgURL:string,userId:string)=>{
        return await repository.updateProPic(imgURL,userId)
    }

    return{
        getByUserId,
        changeProPic
    }

}


export type userDBInterface=typeof userRepositoryInterface