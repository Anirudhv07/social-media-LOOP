import express from "express"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { messageDBInterface } from "../../application/repositoryInterface/messageRepositoryInterface"
import { messageDBRepository } from "../../frameworks/database/repository/messageRespository"


const messageController=(messageRepositoryInterface:messageDBInterface,messageRepository:messageDBRepository)=>{
    const repository=messageRepositoryInterface(messageRepository())

    return{

    }
}

export default messageController