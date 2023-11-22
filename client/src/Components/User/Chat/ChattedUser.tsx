import { List, ListItem, ListItemPrefix, Avatar, Typography, Button, Input, Card, CardBody, Collapse } from '@material-tailwind/react'
import React, { useState } from 'react'
import {
  XMarkIcon,
MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { findUser } from '../../../api/apiConnection/homeConnection';
import ChatSearchList from './ChatSearch';
import { useSelector } from 'react-redux';

interface chatSearch{
  setSelectedUser:any,
  chatList:any,
  setChatList:any
}
const ChattedUser:React.FC<chatSearch>=({setSelectedUser,chatList,setChatList})=> {
  const {userId} = useSelector((store:any)=>store.user)
  const [searchText,setSearchText]= useState('')
  const [searchedUserList,setSearchedUserList]=useState([])
  const [open, setOpen] = React.useState(false);
  const [openNav, setOpenNav] = React.useState(false);
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const toggleOpen = () =>{
  
    setOpenCollapse((cur) => !cur);
  } 

  const searchUser=async(event:any)=>{
   
    setSearchText(event.target.value)
    const response=await findUser(event.target.value as string)
    setSearchedUserList(response)
    
    
  }

  const getUserName=(users:any,userId:string)=>{
    if(users[0]._id==userId){
      return users[1].userName
    }else{
      return users[0].userName
    }
  }

  const accessProPic=(users:any,userId:string)=>{
    if(users[0]._id==userId){
      return users[1].profilePic
    }else{
      return users[0].profilePic
    }
  }


 

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className=" mt-2 flex flex-col gap-2 p-3 w-full">
      <div>
      <div className="relative flex w-full gap-2" onClick={()=>setOpenCollapse(!openCollapse)}>
        <Input
          type="search"
          label="Search here..."
          onChange={searchUser}
          onClick={toggleOpen}
          

          containerProps={{
           
          }} crossOrigin={undefined} />
        {/* <Button size="sm" className="!absolute right-1 top-1 rounded bg-gradient-to-r from-purple-800 via-purple-600 to-purple-300 text-white">
  Search
</Button> */}
</div>
<div className='flex justify-end p-1'>
  <Button size='sm'>New Group +</Button>
</div>
<Collapse open={openCollapse} className="absolute ">
        <Card className="mx-auto w-full " >
         
          <CardBody className='bg-blue-gray-50 rounded-xl p-2'  style={{zIndex:11}}>
          <div className="flex flex-row justify-between">
            <div>

            </div>
           
          <div className="h-3 w-3  cursor-pointer" onClick={()=>setOpenCollapse(!openCollapse)}>
                                <XMarkIcon color="black" />
                            </div>

          </div>
            {searchedUserList.length==0?<Typography  className="text-center italic">Type Something...</Typography>:searchedUserList.map((userList:any)=>{
             return(

               <ChatSearchList userList={userList} 
                setSelectedUser={setSelectedUser} 
                chatList={chatList} 
                setChatList={setChatList}
                 setOpenCollapse={setOpenCollapse}
                  openCollapse={openCollapse}/>
             )
            })}
            {/* {searchedUserList.map((userList:any)=>{
             return(

               <UserSearchList userList={userList} />
             )
            })} */}
          </CardBody>
        </Card>
      </Collapse>


      </div>


    </ul>
  );


  return (
    <div className='w-full'>
        <div style={{ position: 'relative' }}>
      <div >

         <div className="hidden lg:block">{navList}</div>
      </div>
      <div>
        {
          openCollapse?<div></div>:
          <List>
          {chatList?chatList.map((singleChat:any)=>{
            return(
              <div key={singleChat._id} onClick={setSelectedUser(singleChat)}>
  
                <ListItem >
                  <ListItemPrefix>
                    <Avatar variant="circular" className='z-10' alt="candice" src={process.env.PROFILE_PIC_URL + accessProPic(singleChat.users,userId)} />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {singleChat.isGroupChat=='false'?getUserName(singleChat.users,userId): singleChat.chatName}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Software Engineer @ Material Tailwind
                    </Typography>
                  </div>
                  
        
                </ListItem>
                  <hr className="my-2 border-blue-gray-100" />
              </div>
            )
  
          }):<div></div>}
          </List>
        }
      
      </div>
          </div>
    </div>
  )
}

export default ChattedUser
