import { userDBInterface } from "../../repositoryInterface/userAuthRepositoryInterface"
import { AuthServicesInterface } from "../../service/authServiceInterface"


export const registerUser=async(user:{firstName:string,
    lastName:string,
    userName:string,
    email:string,
    gender:string,
    password:string,
    phoneNumber:number},repository:ReturnType<userDBInterface>,
    authService:ReturnType<AuthServicesInterface>)=>{

    //business logics
    user.email=user.email.toLowerCase()
    const isEmailExist:any = await repository.getUserByEmail(user.email)
    if(isEmailExist){
        const userData={
            status:"failed",
            message:"Email already exists",
            user:{},
            token:''
        };  
        return userData
        
    }

    const isUserNameExist=await repository.getUserByUserId(user.userName)
    if(isUserNameExist){
        const userData={
            status:"failed",
            message:"Username already exists",
            user:{},
            token:""
        }
        return userData
    }

    
    let encryptedPassword= await authService.encryptedPassword(user.password)
    user.password=encryptedPassword
    const data= await repository.addUser(user)
    const jwtToken= await authService.generateToken(data._id?.toString())

    const userData={
        status:"success",
        message:"Registration Success",
        user:data,
        token:jwtToken
    }
    return userData
}


export const gooSignUp=async(user:{
    userName:string,
    email:string,
   },repository:ReturnType<userDBInterface>,
    authService:ReturnType<AuthServicesInterface>)=>{

    //business logics
    user.email=user.email.toLowerCase()
    const isEmailExist:any = await repository.getUserByEmail(user.email)
    if(isEmailExist){
        const userData={
            status:"failed",
            message:"Email already exists",
            user:{},
            token:''
        };  
        return userData
        
    }

    const isUserNameExist=await repository.getUserByUserId(user.userName)
    if(isUserNameExist){
        const userData={
            status:"failed",
            message:"Username already exists",
            user:{},
            token:""
        }
        return userData
    }

    
   
   
    const data= await repository.googleAddUser(user)
    
    
    const jwtToken= await authService.generateToken(data._id?.toString())

    const userData={
        status:"success",
        message:"Registration Success",
        user:data,
        token:jwtToken
    }
    return userData
}



