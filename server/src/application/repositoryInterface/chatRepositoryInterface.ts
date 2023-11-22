import { chatDBRepository } from "../../frameworks/database/repository/chatRepository"

export const chatRepositoryInterface=(repository:ReturnType<chatDBRepository>)=>{

    const handleAccessOrCreateChat=async(senderId:string,loggedUser:string)=>{
        return await repository.handleChat(senderId,loggedUser)
    }

    const fetchChat=async(senderId:string)=>{
        return await repository.handleFetchChat(senderId)
    }

    const handleGroupChat=async(users:any,name:string,myId:string)=>{
        return await repository.groupChat(users,name,myId)
    }

    const handleRenameGroup=async(groupId:string,groupName:string)=>{
        return await repository.renameGroup(groupId,groupName)
    }

    const addMemberToGroup=async(chatId:string,userId:string)=>{
        return await repository.addMember(chatId,userId)
    }

    const removeMemberFromGroup=async(chatId:string,userId:string)=>{
        return await repository.removeMember(chatId,userId)
    }

    return{
        handleAccessOrCreateChat,
        fetchChat,
        handleGroupChat,
        handleRenameGroup,
        addMemberToGroup,
        removeMemberFromGroup
    }
}

export type chatDBInterface=typeof chatRepositoryInterface