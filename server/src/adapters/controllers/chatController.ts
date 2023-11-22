import express, { NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { chatDBInterface } from "../../application/repositoryInterface/chatRepositoryInterface"
import { chatDBRepository } from "../../frameworks/database/repository/chatRepository"
import { addMember, chatUseCase, fetchChatUseCase, groupChat, removeMember, rename } from "../../application/useCases/chat"
import Chat from "../../frameworks/database/models/chatModel"


const chatController=(chatRepositoryInterface:chatDBInterface,chatRepository:chatDBRepository)=>{
    const repository=chatRepositoryInterface(chatRepository())

    const accessChat=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body);
        
        const {senderId,loggedUser} = req.body  
              
       const response= await chatUseCase(senderId,loggedUser,repository)
       res.send(response)
    })
    const fetchChat=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,req.query,'hei fetch');
        
        const senderId=req.query.senderId
        
        const response=await fetchChatUseCase(senderId,repository)
        console.log(response,'fetdch');
        
        res.send(response)
    })

    const createGroupChat = asyncHandler(async(req:Request,res:Response)=>{
       const {users,name,myId}=req.body
       console.log(users,name,myId,'hi');
       
       if(!users || !name){
         res.status(400).send({message:'Please fill all the fields'})
    }

    let userList =await JSON.parse(users)

    if(userList.length<2){
         res.status(400)
        .send('More than 2 users are required to form a group chat')
    }

    userList.push(myId)

   
    
        const response=await groupChat(userList,name,myId,repository)

      res.send(response)

    })

    const renameGroup=asyncHandler(async(req:Request,res:Response)=>{
        const {groupId,groupName}=req.body
        const response=await rename(groupId,groupName,repository)
        res.send(response)
    })

    const removeFromGroup=asyncHandler(async(req:Request,res:Response)=>{
        const {chatId,userId}=req.body
        const response=await removeMember(chatId,userId,repository)
        res.send(response)
    })

    const addToGroup=asyncHandler(async(req:Request,res:Response)=>{
        const {chatId,userId}=req.body
        const response=await addMember(chatId,userId,repository)
        res.send(response)
    })
    return{
        accessChat,
        fetchChat,
        createGroupChat,
        renameGroup,
        removeFromGroup,
        addToGroup
    }
}

export default chatController