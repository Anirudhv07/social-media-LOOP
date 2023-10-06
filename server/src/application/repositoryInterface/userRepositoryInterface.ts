import { userDBRepository } from "../../frameworks/database/repository/userRepository"


  
export const userRepositoryInterface=(repository:ReturnType<userDBRepository>)=>{

    const getByUserId=async(userId:string)=>{
        
        return await repository.getUserByUserId(userId)
    }

    return{
        getByUserId
    }

}

export type userDBInterface=typeof userRepositoryInterface