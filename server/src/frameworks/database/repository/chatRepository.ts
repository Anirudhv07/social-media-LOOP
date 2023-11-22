import Chat from "../models/chatModel";
import mongoose from "mongoose";
import User from "../models/userModel";

export const chatRepository=()=>{

    const handleChat=async(user:string,userId:string)=>{
        let isChat = await Chat.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:user}}},
                {users:{$elemMatch:{$eq:userId}}}
            ],
        })
        .populate('users','-password')
        .populate('latestMessage')
        .populate('latestMessage.sender','profilePic userName')

        console.log('isChatttttt',isChat);

        if(isChat.length>0){
            return isChat[0]
        }else{
            let chatData={
                chatName:'sender',
                isGroupChat:false,
                users:[userId,user]
            }

            try{
                const createdChat = await Chat.create(chatData)
                const fullChat =await Chat.findOne({_id:createdChat._id})
                .populate("users","-password")
                .populate("groupAdmin","-password")
                .populate("latestMessage")
                .populate("latestMessage.sender", "name dp userName")
                .sort({updatedAt:-1})

                return fullChat
            }catch(error){
                return error

            }
        }
        
    }

    const handleFetchChat=async(senderId:string)=>{
        try{
          const response=  await Chat.find({users:{$elemMatch:{$eq:senderId}}})
          .populate("users","-password")
          .populate("groupAdmin","-password")
          .populate("latestMessage")
          .populate("latestMessage.sender", "name dp userName")
          .sort({updatedAt:-1})


          return response
        
          
        }catch(err){
            console.error(err)
            return false
        }
    }

    const groupChat=async(users:any,name:string,myId:string)=>{
        console.log(users,'userfjjsdjfj');
        // Convert user IDs to ObjectIds
const userIds = users.map((userId: string) => new mongoose.Types.ObjectId(userId));

// Convert groupAdmin to ObjectId
const groupAdminId = new mongoose.Types.ObjectId(myId);
        
        try{

            const group=await Chat.create({
             chatName:name,
             users:userIds,
             isGroupChat:true,
             groupAdmin:groupAdminId
            })
            console.log(group,'gopp');
            

            const fullGroupChat= await Chat.findOne({_id:group._id})
            .populate("users","-password")
            .populate("groupAdmin","-password")

            console.log(fullGroupChat,'fullchat');
            
            return fullGroupChat
        }catch(error){
            console.log(error,'err');
            
            return error
        }

    }

    const renameGroup=async(groupId:string,groupName:string)=>{
        const isGroup=await Chat.findOne({_id:groupId})
        if(isGroup){
            if(isGroup.isGroupChat==='true'){

                const response=await Chat.findByIdAndUpdate({_id:groupId},{$set:{chatName:groupName}})
                .populate('users','-password')
                .populate('groupAdmin','-password')
                if(response){  
                    return response
                }
            }else{
                return ({message:"It is not a group"})
            }
            
        }else{
            return ({message:'No group found'})
        }
        
    }

    const addMember=async(chatId:string,userId:string)=>{
        const userID = new mongoose.Types.ObjectId(userId);
        const findChat= await Chat.findOne({_id:chatId})
        try{

            if(findChat){
                if(findChat.users.includes(userID)){
                    return ({message:'User already Exist'})
                   
                }else{
                    const addUserToGroup=await Chat.findOneAndUpdate({_id:chatId},{$addToSet:{users:userID}}, { new: true })
                    .populate("users","-password")
                    .populate("groupAdmin","-password")
                    return ({message:'User added to the Group Successfully', chat :addUserToGroup})
                }
            }else{
                return ({message:"No chat found"})
            }
        }catch(error){
            return ({message:"Error Occured",error})
        }
        
    }

    const removeMember=async(chatId:string,userId:string)=>{
        const userID = new mongoose.Types.ObjectId(userId);
        const findChat= await Chat.findOne({_id:chatId})
        try{

            if(findChat){
                if(findChat.users.includes(userID)){
                    const removeUserGroup=await Chat.findOneAndUpdate({_id:chatId},{$pull:{users:userID}}, { new: true })
                    .populate("users","-password")
                    .populate("groupAdmin","-password")
                    return ({message:'User is removed successfully from Group ', chat :removeUserGroup})
                    
                }else{
                    return ({message:'User is not in group'})
                }
            }else{
                return ({message:"No chat found"})
            }
        }catch(error){
            return ({message:"Error Occured",error})
        }
        
    }
    return{
        handleChat,
        handleFetchChat,
        groupChat,
        renameGroup,
        addMember,
        removeMember
    }
}

export type chatDBRepository=typeof chatRepository