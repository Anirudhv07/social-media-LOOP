import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CreateNewPost from "./Create";

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


const ProfileCard = ({ myData }: { myData: myDetails }) => {



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






  return (
    <div className="flex flex-col gap-2 ">

   
    <Card className="mt-6 w-[20rem] flex flex-col items-center justify-between">
      <CardBody className="flex flex-col items-center justify-center text-center">
        <Avatar
          style={{ width: '150px', height: '150px' }} // Adjust the width and height as needed
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
          Explore the world
        </Typography>
        <hr className="mt-5" style={hrStyle} />

        <div className="flex flex-row gap-6 pt-3 ">

          <div >
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Following
            </Typography>
            <p>23</p>
          </div>
          <hr style={vrStyle} />
          <div></div>
          <div >
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Followers
            </Typography>
            <p>23</p>
          </div>

        </div>

        <hr className="mt-5" style={hrStyle} />
      </CardBody>
      <CardFooter className="pt-0">

        <Link to={"/myProfile"} className="text-purple-600">View full Profile
        </Link>
      </CardFooter>
    </Card>
    <div className="w-[20rem]">

    <CreateNewPost />
    </div>
    </div>
  );
}


export default ProfileCard


