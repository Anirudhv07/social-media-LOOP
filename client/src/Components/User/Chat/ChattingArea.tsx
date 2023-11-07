import { Textarea, Typography } from '@material-tailwind/react'
import { Avatar } from '@material-tailwind/react/components/Avatar'
import React from 'react'
import Messages from './Messages'

function ChattingArea() {
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-3 '>
        <Avatar variant="circular" alt="candice" src="https://res.cloudinary.com/dzcnq8f0y/image/upload/v1696786318/postImg/post-1696872537657-photo-1438761681033-6461ffad8d80.jpg" />
        <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
        </div>
        <hr className="my-2 border-blue-gray-100" />

        <div className='h-96'>
            {/* <Messages /> */}
        </div>
        <div>
        <div >
      <Textarea label="Message" />
    </div>
        </div>
      
    </div>
  )
}

export default ChattingArea
