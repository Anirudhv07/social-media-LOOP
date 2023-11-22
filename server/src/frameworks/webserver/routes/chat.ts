import express from 'express'
import chatController from '../../../adapters/controllers/chatController'
import { chatRepositoryInterface } from '../../../application/repositoryInterface/chatRepositoryInterface'
import { chatRepository } from '../../database/repository/chatRepository'

const chatRouter=()=>{
    const router=express.Router()
    const controller=chatController(chatRepositoryInterface,chatRepository)

    router.post('/',controller.accessChat)

    router.get('/',controller.fetchChat)

    router.get('/group',controller.createGroupChat)

    router.put('/rename',controller.renameGroup)

    router.put('/groupadd',controller.addToGroup)
    
    router.put('/groupremove',controller.removeFromGroup)


    return router
}

export default chatRouter