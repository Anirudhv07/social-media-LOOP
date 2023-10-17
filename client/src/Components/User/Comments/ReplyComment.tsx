import { Avatar, Typography } from '@material-tailwind/react'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'


interface reply{
    reply:{
        replyToUserName:string,
        comment:string,
        liked:[],
        createdAt:Date,
        userProPic:string
    }
}
const ReplyComment:React.FC<reply>=({reply})=> {

  return (
    <div>
      <div className="flex flex-col m-3 bg-blue-gray-100 p-2 w-4/5 float-right">
                    <div className="flex flex-row  gap-3 justify-between items-center">
                        <div className="flex flex-row  gap-3 items-center flex-wrap">
                            <div className="flex flex-row  gap-3 items-center" >
                                <Avatar variant="circular" alt="" src={process.env.PROFILE_PIC_URL + reply?.userProPic} />

                                <div className="cursor-pointer">
                                    <Typography variant="h6" className="cursor-pointer" color="blue-gray">
                                    {'@'+reply?.replyToUserName}
                                
                                    </Typography>
                                </div>

                            </div>
                            <div className="break-words w-68 text-black items-center" >
                                {reply.comment}
                            </div>
                        </div>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>

                    </div>
                    <div className="text-sm pt-4 flex flex-row justify-start gap-5">
                        {moment(reply.createdAt).calendar()}

                        <div className="flex flex-row gap-5">
                            <Typography className="text-sm">
                                {reply.liked.length} Likes
                            </Typography>
                            <Typography className="text-sm">
                                Reply
                            </Typography>

                        </div>

                    </div>
                </div>
    </div>
  )
}

export default ReplyComment
