import ProfileCard from "../../../Components/User/Home/ProfileCard";
import RightSideBar from "../../../Components/User/Home/RightSideBar";
import TabSlide from "../../../Components/User/Home/TabSlide";
import NavbarHeader from "../../../Components/User/Home/Navbar";
import { useSelector } from "react-redux";
import { getMyProfile } from "../../../api/apiConnection/homeConnection";
import { useEffect, useState } from "react";

interface myDetails{
  email:string,
  phone:string,
  profilePic:string,
  userName:string,
  firstName:string,
  lastName:string,
  followers:[],
  following:[]
  
}

const Home = () => {


  const Details:myDetails = {
    email:'',
    phone:'',
    profilePic:'',
    userName:'',
    firstName:'',
    lastName:'',
    followers:[],
    following:[]
  }
  const userId =useSelector((state:any)=>state.user.userId)
  const [myData,setMyData]=useState<myDetails>(Details)

  

  useEffect(()=>{
    myDetails()
  },[])


  const myDetails=async()=>{
    const myProfile=await getMyProfile(userId as string)
    if(myProfile){
      const details={
        email:myProfile.email,
        phone:myProfile.phone,
        profilePic:myProfile.profilePic,
        userName:myProfile.userName,
        firstName:myProfile.firstName,
        lastName:myProfile.lastName,
        followers:myProfile.followers,
        following:myProfile.following
      }


      setMyData(details)

    }

  }



  
  
  

  return (
    <div className="w-full p-4 ">
      <div className="w-full  h-1/2">
      <div className="">

        <NavbarHeader />
      
       
        <div className="flex flex-row justify-center pt-20 ">
          <div className="fixed left-5">

         <ProfileCard  myData={myData}/>
          </div>
        <TabSlide />
        <div className="fixed right-5">
          <RightSideBar />
          </div>

        </div>
        </div>
      </div>

    </div>
  )
}

export default Home
