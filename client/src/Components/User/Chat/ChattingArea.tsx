import { Textarea, Typography } from '@material-tailwind/react'
import { Avatar } from '@material-tailwind/react/components/Avatar'
import React, { useRef } from 'react'
import Messages from './Messages'

function ChattingArea({selectedUser}:{selectedUser:any}) {
  const textAreaRef=useRef<HTMLTextAreaElement | null>(null)
  if(selectedUser._id!=null){
    if(textAreaRef.current){
      textAreaRef.current.focus()
  }
}
  
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-3 '>
        <Avatar variant="circular" alt="candice" src={process.env.PROFILE_PIC_URL + selectedUser.profilePic} />
        <Typography variant="h6" color="blue-gray">
        {selectedUser.firstName}&nbsp;{selectedUser.lastName}
            </Typography>
        </div>
        <hr className="my-2 border-blue-gray-100" />

        <div className='h-96'>
            {/* <Messages /> */}
        </div>
        <div>
        <div > 
         
        <textarea
  placeholder="Type something"
  className='h-20 w-full focus:outline-none resize-none rounded-md outline-none border border-gray-400 p-2'
  ref={textAreaRef}
></textarea>

        </div>
        </div>
      
    </div>
  )
}

export default ChattingArea
