import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import React, { useState } from "react";
import DialogBox from "./DialogBox";
import dotenv from 'dotenv'
import { useSelector } from "react-redux";




interface myDetails {
  userId: string,
  email: string,
  phone: string,
  profilePic: string,
  userName: string,
  firstName: string,
  lastName: string,
  followers: [],
  following: []
}

interface topCard{
  myData:myDetails,
  allPosts:[]
}
const TopCard:React.FC<topCard>=({ myData ,allPosts})=> {




  const { userProPic, userId } = useSelector((store: any) => store.user)


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <Card
      shadow={false}
      className="relative grid h-[35rem] w-4/5 mx-auto mt-20 items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12 ">
        {myData.userId === userId ? <div className="relative flex flex-auto justify-center group cursor-pointer " onClick={handleOpen}>
          <Avatar
            style={{ width: '130px', height: '130px' }}
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white relative transition-transform hover:filter-darken"
            src={process.env.PROFILE_PIC_URL + userProPic}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            color="white"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 opacity-0 group-hover:opacity-100"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(2px 2px 4px rgba(1, 1, 1, 2))', // Adjust shadow properties as needed
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

        </div> : <div className="relative flex flex-auto justify-center">
          <Avatar
            style={{ width: '130px', height: '130px' }}
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white relative transition-transform hover:filter-darken"
            src={process.env.PROFILE_PIC_URL + myData.profilePic}
          />


        </div>}


        <DialogBox handleOpen={handleOpen} open={open} />

        <Typography variant="h5" className="mt-4 text-white">
          {myData.firstName} &nbsp;
          {myData.lastName}
        </Typography>
        <p>{myData.userName}</p>
        <Typography className="font-sans py-5  text-white" style={{
          fontFamily: "monospace",
        }}  >
          <span>--  </span>
          Explore the world
          <span>  --</span>

        </Typography>
        <div className="flex flex-row gap-12 pt-3 text-white" >

          <div >
            <Typography variant="h6" className="mb-1">
              Posts
            </Typography>
            <p>{allPosts.length}</p>
          </div>

          <div >
            <Typography variant="h6" className="mb-1">
              Followers
            </Typography>
            <p>{myData.following.length}</p>
          </div>

          <div >
            <Typography variant="h6" className="mb-1">
              Followers
            </Typography>
            <p>{myData.followers.length}</p>
          </div>

        </div>

      </CardBody>
    </Card>
  );
}

export default TopCard