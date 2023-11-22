import express from 'express'
import messageController from '../../../adapters/controllers/messageController'
import { messageRepositoryInterface } from '../../../application/repositoryInterface/messageRepositoryInterface'
import { messageRepository } from '../../database/repository/messageRespository'

const messageRouter=()=>{
    const router=express.Router()
    const controller=messageController(messageRepositoryInterface,messageRepository)


    return router
}

export default messageRouter