import  { useEffect, useState }  from 'react'
import NavbarHeader from '../../../Components/User/Home/Navbar'
import TopCard from '../../../Components/User/Profile/TopCard'
import BottomCard from '../../../Components/User/Profile/BottomCard'
import { getMyProfile } from '../../../api/apiConnection/homeConnection'
import { useSelector } from 'react-redux'

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

const MyProfile=()=> {

  const Details:myDetails={
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
    <div >
        
        <NavbarHeader />
        <TopCard myData={myData}/>
        <BottomCard />
    </div>
  )
}

export default MyProfile

