import { chatDBInterface } from "../repositoryInterface/chatRepositoryInterface"

export const chatUseCase=async(senderId:string,loggedUser:string,repository:ReturnType<chatDBInterface>)=>{
    return await repository.handleAccessOrCreateChat(senderId,loggedUser)
}

export const fetchChatUseCase=async(senderId:any,repository:ReturnType<chatDBInterface>)=>{
    return await repository.fetchChat(senderId)
}

export const groupChat=async(users:any,name:string,myId:string,repository:ReturnType<chatDBInterface>)=>{
    return await repository.handleGroupChat(users,name,myId)
}

export const rename =async(groupId:string,groupName:string,repository:ReturnType<chatDBInterface>)=>{
    return await repository.handleRenameGroup(groupId,groupName)
}

export const addMember= async(chatId:string,userId:string,repository:ReturnType<chatDBInterface>)=>{
    return await repository.addMemberToGroup(chatId,userId)
}

export const removeMember= async(chatId:string,userId:string,repository:ReturnType<chatDBInterface>)=>{
    return await repository.removeMemberFromGroup(chatId,userId)
}