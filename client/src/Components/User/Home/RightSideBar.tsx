import {
  Card,
  Typography,
  List,
 
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser } from "../../../api/apiConnection/homeConnection";
import { setFollowingCount, setSuggestedPeople } from "../../../redux/userRedux/slice";
import MyProfile from "../../../Pages/User/Profile/Profile";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
interface myDetails {
  email: '',
  phone: '',
  profilePic: '',
  userName: '',
  firstName: '',
  lastName: '',
  followers: [],
  following: []
}



function RightSideBar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [profileID,setProfileID]=useState('')
  const {userId,followingCount,suggestedPeople} =useSelector((state:any)=>state.user)
  
  const followUnfollow=async(followerId:string)=>{
  
    const response=await followUnfollowUser(followerId,userId)
    const suggested=suggestedPeople.filter((ele:any)=>ele._id!==followerId)
    
    
    dispatch(setFollowingCount(followingCount+1))
    dispatch(setSuggestedPeople(suggested))
    
  }

  const getProfileOfUser=(userId:string)=>{
    setProfileID(userId)

  }
  
  

  return (
    <div>

      <Card className="h-[calc(100vh-20rem)] w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-hidden">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            People May Know You
          </Typography>
        </div>

        {suggestedPeople.map((userDetails: any) => {
          if(userDetails._id === userId){
            return
          }else{
            if(userDetails.followers.includes(userId)){
              return
            }else{
              return (
                <List key={userDetails._id}>
                  
    
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div>
    
                      <Avatar src={process.env.PROFILE_PIC_URL + userDetails.profilePic} alt="avatar" />
                    </div>
                    <div>
                      <div className="flex flex-row ">
                        <div className="justify-start">
                          
                          <Typography variant="h6" className="cursor-pointer" onClick={()=>{navigate(`/myProfile/${userDetails._id}`)}}>{userDetails.firstName}&nbsp;{userDetails.lastName}</Typography>
                          {/* <MyProfile profileID={profileID} /> */}
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Web Developer
                          </Typography>
                        </div>
                      </div>
                    </div>
                      <div>
    
                        <Typography variant="small" className="cursor-pointer" onClick={()=>followUnfollow(userDetails._id)}>follow +</Typography>
                      </div>
                  </div>
                </List>
              )

            }

          }
        })}
      </Card>
    </div>

  );
}


export default RightSideBar