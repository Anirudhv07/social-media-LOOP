import { messageDBRepository } from "../../frameworks/database/repository/messageRespository"

export const messageRepositoryInterface=(repository:ReturnType<messageDBRepository>)=>{

    return{

    }
}

export type messageDBInterface=typeof messageRepositoryInterface