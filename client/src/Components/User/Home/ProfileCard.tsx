import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import CreateNewPost from "./Create";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followingList, followerList } from "../../../api/apiConnection/homeConnection";
import FollowDialog from "./FollowDialog";
import { setFollowerCount } from "../../../redux/userRedux/slice";

interface myDetails {
  email: string,
  phone: string,
  profilePic: string,
  userName: string,
  firstName: string,
  lastName: string,
  bio:string,
  followers: [],
  following: []
}
const follow = {

  _id: '',
  userId: '',
  firstName: '',
  lastName: '',
  profilePic: ''
}

const ProfileCard = ({ myData }: { myData: myDetails }) => {

const navigate=useNavigate()
 
  
  const [followList, setFollowList] = useState([follow])
  const [isFollow, setIsFollow] = useState('')

  const hrStyle = {
    width: '100%',            // Adjust the width to your desired length
    height: '1.5px',           // Set the height to control the line thickness
    backgroundColor: '#cccccc', // Set the line color
  };
  const vrStyle = {
    width: '50%',            // Adjust the width to your desired length
    height: '10px',           // Set the height to control the line thickness
    backgroundColor: '#999999', // Set the line color
    transform: 'rotate(90deg)' // Rotate the line by 45 degrees
  };



  const {userId,followerCount,followingCount} = useSelector((state: any) => state.user)
  

  const myFollowingList = async () => {
    const response = await followingList(userId)
    setFollowList(response)
    setIsFollow('Following')

  }
  const myFollowerList = async () => {
    const response = await followerList(userId)
    setFollowList(response)
    setIsFollow('Follower')

  }
  const [open, setOpen] = useState(false);

  const handleOpen = (conditions: string) => {
    if (conditions == 'Followings') {

      myFollowingList()
      setOpen(!open)
    } else {
      myFollowerList()
      setOpen(!open)
    }


  };


  return (
    <div className="flex flex-col gap-2 ">


      <Card className="mt-6 w-[20rem] flex flex-col items-center justify-between">
        <CardBody className="flex flex-col items-center justify-center text-center">
          <Avatar
            style={{ width: '150px', height: '150px' }} // Adjust the width and height as needed
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src={process.env.PROFILE_PIC_URL+myData.profilePic}
          />

          <div >

            <Typography variant="h5" color="blue-gray" className="flex flex-row " >
              {myData.firstName} &nbsp;
              {myData.lastName}
            </Typography>


            <p className="sm smaller-text" style={{ color: 'gray', fontSize: '12px' }}> {myData.userName}</p>

          </div>
          <Typography className="font-semibold py-5 " style={{
            background: 'linear-gradient(to right,  #9400D3, #9370DB ,#87CEEB,#0000FF)',
            WebkitBackgroundClip: 'text',
            fontFamily: "monospace",
            color: 'transparent',
          }}  >
            {myData.bio}
          </Typography>
          <hr className="mt-5" style={hrStyle} />

          <div className="flex flex-row gap-6 pt-3 ">

            <div onClick={() => handleOpen('Followings')} className="cursor-pointer">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Following
              </Typography>
              <p>{followingCount}</p>
            </div>
            <FollowDialog handleOpen={handleOpen} open={open} followList={followList} isFollow={isFollow} />

            <hr style={vrStyle} />
            <div></div>
            <div onClick={() => handleOpen('Followers')} className="cursor-pointer">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Followers
              </Typography>
              <p>{followerCount}</p>
            </div>
            {/* <FollowDialog handleOpen={handleOpen} open={open} followList={followList}/> */}


          </div>

          <hr className="mt-5" style={hrStyle} />
        </CardBody>
        <CardFooter className="pt-0">

          <Typography onClick={()=>{navigate(`/myProfile/${userId}`)}} className="text-purple-600 cursor-pointer">View full Profile
          </Typography>
        </CardFooter>
      </Card>
      <div className="w-[20rem]">

        <CreateNewPost />
      </div>
    </div>
  );
}


export default ProfileCard


