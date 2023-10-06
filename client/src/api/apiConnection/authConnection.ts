import apiURL from "../axiosUser";


interface SignUpFormValues{
    firstName?:string,
    lastName?:string,
    userName?:string
    email?:string,
    gender?:string,
    password?:string
    phoneNumber?:string
}
interface SignupFormResponse{
    message:string,
    status:string,
    user:object,
    token:string
}


interface LogInFormValues{
    email:string,
    password:string
}

interface GoogleSignUpUser{
    userName:string|null,
    email:string|null
    
}

interface LogInFormResponse{
    message?:string,
    status?:string,
    user?:{userName:string,_id:string,profilePic:string},
    token?:string
}

export const signUp = async(values: SignUpFormValues):Promise<object>=>{
    try{
        const response= await apiURL.post<SignupFormResponse>("/auth/addUser",values)
        return response?.data
 
    }catch(error:any){
        throw new Error(error)
    }
}

export const logIn = async(values:LogInFormValues):Promise<object>=>{
    try{
        const response = await apiURL.post<LogInFormResponse>("/auth/logIn",values)
        
        
        return response?.data
    }catch(error:any){
        throw new Error(error)
    }

}


export const googleAuth=async(values:string)=>{
    try{
        
        
        const response = await apiURL.post <LogInFormResponse>("/auth/googleLogIn",{values})
        
        
        return response?.data
        
    }catch(error:any){
        throw new Error(error)
    }
}

export const googleSignUpUser=async(values:GoogleSignUpUser):Promise<object>=>{
    try{
      
        
        const response = await apiURL.post <LogInFormResponse>("/auth/googleSignUp",values)
        
        
        return response?.data
        
    }catch(error:any){
        throw new Error(error)
    }
}