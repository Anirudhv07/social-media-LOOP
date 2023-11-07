import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Card,
  CardBody,
  Collapse,
  CardHeader,
} from "@material-tailwind/react";

import AvatarDropdown from "./AvatarDropdown";
import { Link } from "react-router-dom";
import DialogBox from "./Dialog";
import ChatBox from "../Chat/ChatDialog";
import { findUser } from "../../../api/apiConnection/homeConnection";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import UserSearchList from "./UserSearchList";
function NavbarHeader() {

  const [open, setOpen] = React.useState(false);
  const [searchText,setSearchText]= useState('')
 
  const [searchedUserList,setSearchedUserList]=useState([])
  const handleOpen = () => setOpen(!open);
  const [openNav, setOpenNav] = React.useState(false);

  const searchUser=async(event:any)=>{
   
    console.log(event.target.value);
    
    setSearchText(event.target.value)

    const response=await findUser(event.target.value as string)
    setSearchedUserList(response)
    
    

    
  }

  const [openCollapse, setOpenCollapse] = React.useState(false);
 
  const toggleOpen = () => setOpenCollapse((cur) => !cur);



 

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className=" mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 w-full">
      <div className="relative flex w-full gap-2 md:w-max ml-32" onClick={()=>setOpenCollapse(!openCollapse)}>
        <Input
          type="search"
          label="Search here..."
          className="pr-25 "
          onChange={searchUser}
          onClick={toggleOpen}
          

          containerProps={{
            className: "min-w-[500px]",
          }} crossOrigin={undefined} />
        {/* <Button size="sm" className="!absolute right-1 top-1 rounded bg-gradient-to-r from-purple-800 via-purple-600 to-purple-300 text-white">
  Search
</Button> */}

<Collapse open={openCollapse} className="absolute">
        <Card className="mt-10  mx-auto w-full" >
          <div className="flex flex-row m-3 justify-between">
            <div>

            </div>
           
          <div className="h-3 w-3  cursor-pointer" onClick={()=>setOpenCollapse(!openCollapse)}>
                                <XMarkIcon color="black" />
                            </div>

          </div>
          <CardBody>
            {searchedUserList.length==0?<Typography  className="text-center italic">Type Something...</Typography>:searchedUserList.map((userList:any)=>{
             return(

               <UserSearchList userList={userList} />
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

    <div className=" flex flex-row justify-center">

    <Navbar className=" fixed z-30 top-0 h-max  py-2 px-4 lg:px-8 lg:py-4 ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer font-medium"
        >
          <Link to={"/"}>

          <img src="/icons/logoBlackNew.png" style={{width:"80px"}} alt="" />
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex flex-row gap-5">
          <div className="gap-3">
          <Link to={"/"}>
          <Button className="bg-transparent shadow-none hover:shadow-none" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" color="black" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Button>
          </Link>

          <Button className="bg-transparent shadow-none hover:shadow-none" onClick={handleOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" color="black" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

          </Button>
          <ChatBox handleOpen={handleOpen} open={open}/>
          </div>
          <AvatarDropdown />
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
    </div>
  );
}

export default NavbarHeader