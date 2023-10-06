import { AuthServicesReturn } from "../../frameworks/services/authService"

export const authServiceInterface =(service:AuthServicesReturn)=>{
    const encryptedPassword=async(password:string)=>{
        return await service.encryptedPassword(password)
    }

    const comparePassword=async(password:string,hashedPassword:string)=>{
        return await service.comparePassword(password,hashedPassword)
    }

    const generateToken =async(payload:string)=>{
        return service.genetateToken(payload)
    }

    const verifyToken = async(token:string)=>{
        return service.verifyToken(token)
    }

    return {
        encryptedPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}

export type AuthServicesInterface=typeof authServiceInterface