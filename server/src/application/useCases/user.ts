import { userDBInterface } from "../repositoryInterface/userRepositoryInterface";

export const myProfie=async(userId:string,repository:ReturnType<userDBInterface>)=>{
    
    const response=await repository.getByUserId(userId)
    if(response){
        response.password=""
    }
    
    return response

}