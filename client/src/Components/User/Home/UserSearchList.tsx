import { ListItemPrefix, Avatar, Typography } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchedUserList{
    firstName:string,
    lastName:string,
        profilePic:string
}
const UserSearchList:React.FC<SearchedUserList>=({userList}) =>{
    console.log(userList,'kol');
    
    const navigate=useNavigate()
  return (
    
    <div className=" flex flex-row justify-between p-3">
    <div className="flex flex-row items-center " onClick={()=>{navigate(`/myProfile/${userList._id}`)}}>

        <ListItemPrefix className="cursor-pointer">
            <Avatar variant="circular" className="cursor-pointerr" alt="" src={process.env.PROFILE_PIC_URL + userList.profilePic}  />
        </ListItemPrefix>
        <div>
            <Typography variant="h6" className="cursor-pointer" color="blue-gray">
                {userList.firstName}&nbsp;{userList.lastName}
            </Typography>
        </div>
    </div>


    </div>
  )
}

export default UserSearchList
