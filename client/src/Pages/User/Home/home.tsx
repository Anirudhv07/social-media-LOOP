import ProfileCard from "../../../Components/User/Home/ProfileCard";
import RightSideBar from "../../../Components/User/Home/RightSideBar";
import TabSlide from "../../../Components/User/Home/TabSlide";
import NavbarHeader from "../../../Components/User/Home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile,getAllUsers,followersPost } from "../../../api/apiConnection/homeConnection";
import { useEffect, useState } from "react";
import { setFollowerCount, setFollowingCount, setSuggestedPeople } from "../../../redux/userRedux/slice";
import { escape, includes } from "lodash";
import { setPostDetails } from "../../../redux/userRedux/postSlice";

interface myDetails {
  email: string,
  phone: string,
  profilePic: string,
  userName: string,
  firstName: string,
  lastName: string,
  followers: [],
  following: []

}

const Home = () => {

  const dispatch=useDispatch()

  const Details: myDetails = {
    email: '',
    phone: '',
    profilePic: '',
    userName: '',
    firstName: '',
    lastName: '',
    followers: [],
    following: []
  }
  const {userId,followerCount,followingCount} = useSelector((state: any) => state.user)
  const [myData, setMyData] = useState<myDetails>(Details)
  const [post,setPost]=useState([])

  const {postDetails}=useSelector((state:any)=>state.post)
  
  


  useEffect(() => {
    myDetails()
    allUsers()
    myFollowingPost()
  }, [followerCount,followingCount])


 

  const myDetails = async () => {
    const myProfile = await getMyProfile(userId as string)
    if (myProfile) {
      const details = {
        email: myProfile.email,
        phone: myProfile.phone,
        profilePic: myProfile.profilePic,
        userName: myProfile.userName,
        firstName: myProfile.firstName,
        lastName: myProfile.lastName,
        followers: myProfile.followers,
        following: myProfile.following
      }

    
    dispatch(setFollowerCount(details?.followers?.length))
    dispatch(setFollowingCount(details?.following?.length))
      setMyData(details)

    }

  }

  const allUsers=async()=>{
    const suggestedUsers: any[] | ((prevState: never[]) => never[])=[]
    const response=await getAllUsers()
    
   response.map((user:any)=>{
    if(user.followers.includes(userId)){
      return
    }else{
      suggestedUsers.push(user)
    }
  })

  dispatch(setSuggestedPeople(suggestedUsers))
     
  }

  const myFollowingPost=async()=>{
    const response=await followersPost(userId) 
    setPost(response)
    dispatch(setPostDetails(response))
    
    
    
  }




  return (
    <div className="w-full p-4 ">
      <div className="w-full  h-1/2">
        <div className="">

          <NavbarHeader />


          <div className="flex flex-row justify-center pt-20 ">
            <div className="fixed left-5 flex flex-col ">
              <ProfileCard myData={myData} />
            </div>
            <div>
            <TabSlide post={post}/>
            </div>
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


