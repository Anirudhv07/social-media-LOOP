import { List, ListItem, ListItemPrefix, Avatar, Typography } from '@material-tailwind/react'
import React from 'react'

function ChattedUser() {
  return (
    <div>
       <List>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src="https://res.cloudinary.com/dzcnq8f0y/image/upload/v1696786318/postImg/post-1696872537657-photo-1438761681033-6461ffad8d80.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
          

        </ListItem>
          <hr className="my-2 border-blue-gray-100" />
        </List>
    </div>
  )
}

export default ChattedUser
