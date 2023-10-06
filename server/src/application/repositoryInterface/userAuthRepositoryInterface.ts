import { userDBRepository } from "../../frameworks/database/repository/userAuthRepository"



export const userRepositoryInterface = (repository: ReturnType<userDBRepository>) => {


    const addUser = async (user:{firstName:string,
        lastName:string,
        userName:string,
        email:string,
        gender:string,
        password:string,
        phoneNumber:number}) => {
        return await repository.addUser(user)
    }

    const googleAddUser = async (user:{
        userName:string,
        email:string}) => {
        return await repository.gooAddUser(user)
    }

    const getUserByEmail=async(email:string)=>{
        
        return await repository.getUserByEmail(email)
    }

    const getUserByUserId=async(userId:string)=>{
        return await repository.getUserByUserId(userId)
    }






    return {

        addUser,
        googleAddUser,
        getUserByEmail,
        getUserByUserId
    }

}

export type userDBInterface = typeof userRepositoryInterface

