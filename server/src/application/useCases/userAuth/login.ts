import { userDBInterface } from "../../repositoryInterface/userAuthRepositoryInterface";
import { AuthServicesInterface } from "../../service/authServiceInterface";


export const logInUser=async(user:{
    email:string,
    password:string
},
repository:ReturnType<userDBInterface>,
authService:ReturnType<AuthServicesInterface>)=>{
    user.email=user.email.toLowerCase()
    const data:any= await repository.getUserByEmail(user.email)
    console.log(data,"usecase");
    
    if(!data){
       const userData={
        status:"failed",
        message:"User does not Exist",
        user:{},
        token:""
       }
       return userData
    }
   if(data.isBlocked){
    const userData={
        status:"failed",
        message:"User is Blocked",
        user:{},
        token:""
    }
    return userData
   }

   const comparePassword=await authService.comparePassword(user.password,data?.password)
   if(!comparePassword){
    const userData={
        status:"failed",
        message:"Password Incorrect",
        user:{},
        token:""
    }

    return userData
   }
   const jwtToken = await authService.generateToken(data?._id?.toString())
   data.password=""
   const userData={
    status:"success",
    message:"Sign in Success",
    user:data,
    token:jwtToken
   }

   return userData

    
}



export const googleLogIn=async(email:string,
repository:ReturnType<userDBInterface>,
authService:ReturnType<AuthServicesInterface>)=>{
    const thisEmail=email.toLowerCase()
    const data:any= await repository.getUserByEmail(thisEmail)
    console.log(data,"usecase");
    
    if(!data){
       const userData={
        status:"failed",
        message:"User does not Exist",
        user:{},
        token:""
       }
       return userData
    }
    
   if(data.isBlocked){
    const userData={
        status:"failed",
        message:"User is Blocked",
        user:{},
        token:""
    }
    return userData
   }
   const jwtToken = await authService.generateToken(data?._id?.toString())
   data.password=""
   const userData={
    status:"success",
    message:"Sign in Success",
    user:data,
    token:jwtToken
   }

   return userData

    
}



