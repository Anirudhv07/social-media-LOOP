import  { useEffect, useState }  from 'react'
import NavbarHeader from '../../../Components/User/Home/Navbar'
import TopCard from '../../../Components/User/Profile/TopCard'
import BottomCard from '../../../Components/User/Profile/BottomCard'
import { getMyProfile } from '../../../api/apiConnection/homeConnection'
import { useSelector } from 'react-redux'
import { getAllPost } from '../../../api/apiConnection/postConnection'
import { useParams } from 'react-router-dom'

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
  const {id}=useParams()

  const [allPosts,setAllPosts]=useState([])
  

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
    allPost()
  },[id])


  const allPost=async()=>{
    const allmyPost=await getAllPost(id as string)
    setAllPosts(allmyPost)

    
  }

  const myDetails=async()=>{
    const myProfile=await getMyProfile(id as string)

    if(myProfile){
      const details={
        userId:myProfile._id,
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
        <TopCard myData={myData} allPosts={allPosts}/>
        <BottomCard allPosts={allPosts}/>
    </div>
  )
}

export default MyProfile

