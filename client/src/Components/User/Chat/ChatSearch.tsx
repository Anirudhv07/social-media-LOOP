import { ListItemPrefix, Avatar, Typography } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getChat } from '../../../api/apiConnection/chatConnection'

interface SearchedUserList{
    userList:{
        firstName:string,
        lastName:string,
            profilePic:string

    },

    setSelectedUser:any,
    chatList:any,
    setChatList:any,
    setOpenCollapse:any,
    openCollapse:boolean
}
const ChatSearchList:React.FC<SearchedUserList>=({userList,setSelectedUser,chatList ,setChatList,setOpenCollapse,openCollapse}) =>{

    const {userId} = useSelector((store:any)=>store.user)
   const selectUser=async(userList:any)=>{

   
    const response=await getChat(userList._id,userId)
   console.log(response,'searc');
   
    setSelectedUser(response)
    setOpenCollapse(!openCollapse)
    if(!chatList.find((c:any)=>c._id==response._id)){
        setChatList([response,...chatList])
    }
   }
  return (
    
    <div className=" flex flex-row justify-between p-3">
    <div className="flex flex-row items-center " onClick={()=>selectUser(userList)}>

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

export default ChatSearchList
