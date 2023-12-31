import  { useEffect, useState }  from 'react'
import NavbarHeader from '../../../Components/User/Home/Navbar'
import TopCard from '../../../Components/User/Profile/TopCard'
import BottomCard from '../../../Components/User/Profile/BottomCard'
import { getMyProfile } from '../../../api/apiConnection/homeConnection'
import { useSelector } from 'react-redux'
import { getAllPost } from '../../../api/apiConnection/postConnection'
import { useParams } from 'react-router-dom'
import { boolean } from 'yup'

interface myDetails{
  email:string,
  phone:string,
  profilePic:string,
  userName:string,
  firstName:string,
  lastName:string,
  bio:string,
  followers:[],
  following:[]
  
}

const MyProfile=()=> {
  const {id}=useParams()
  
  const Details:myDetails={
    email:'',
    phone:'',
    profilePic:'',
    userName:'',
    firstName:'',
    bio:'',
    lastName:'',
    followers:[],
    following:[]
    
  }
  const [allPosts,setAllPosts]=useState([])
  const [myData,setMyData]=useState<myDetails>(Details)
  const [followStat,setFollowStat]=useState(null)
  

  const userId =useSelector((state:any)=>state.user.userId)




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
        bio:myProfile.bio,
        profilePic:myProfile.profilePic,
        userName:myProfile.userName,
        firstName:myProfile.firstName,
        lastName:myProfile.lastName,
        followers:myProfile.followers,
        following:myProfile.following
      }


     const followStatus= await myProfile.followers.includes(userId)
     
     setFollowStat(followStatus)
      setMyData(details)

    }

  }
  return (
    <div >
      
        <NavbarHeader />
        <TopCard myData={myData} allPosts={allPosts} followStat={followStat} setFollowStat={setFollowStat}/>
        <BottomCard allPosts={allPosts}/>
    </div>
  )
}

export default MyProfile

