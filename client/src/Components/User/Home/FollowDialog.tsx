import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser } from "../../../api/apiConnection/homeConnection";
import { setFollowingCount, setSuggestedPeople } from "../../../redux/userRedux/slice";
import { useNavigate } from "react-router-dom";

interface follow {

    _id: String,
    userId:String,
    firstName: String,
    lastName: String,
    profilePic: String
}

interface Dialog {
    handleOpen:() => void ,
    open: boolean,
    followList: follow[],
    isFollow: string
}
const FollowDialog: React.FC<Dialog> = ({ handleOpen, open, followList, isFollow }) => {

    const navigate=useNavigate()

  const dispatch=useDispatch()
  const followingCount=useSelector((state:any)=>state.user.followingCount)
    
    

    const {userId,suggestedPeople} = useSelector((state: any) => state.user)

    const followUnfollow = async (followerId: string,currfollowerList:any) => {
 
       
        
        const response = await followUnfollowUser(followerId, userId)
        dispatch(setSuggestedPeople([...suggestedPeople,currfollowerList]))
        dispatch(setFollowingCount(followingCount-1))
        handleOpen()        
    }

    // const viewProfile=(profileId:string)=>{
        
    //     navigate(`/myProfile/${profileId}`)
    // }
    



    return (
        <>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{isFollow}</DialogHeader>
                <DialogBody divider>
                    <List>
                        {followList.map((followList: any) => {
                            if(isFollow==='Following'){
                                return(
                                    <div className=" flex flex-row justify-between p-3"  >
                                    <div className="flex flex-row items-center " onClick={()=> navigate(`/myProfile/${followList.userId}`)}>

                                        <ListItemPrefix className="cursor-pointer" key={followList._id} >
                                            <Avatar variant="circular"  alt="" src={process.env.PROFILE_PIC_URL + followList.profilePic} />
                                        </ListItemPrefix>
                                        <div className="cursor-pointer">
                                            <Typography variant="h6" className="cursor-pointerr" color="blue-gray">
                                                {followList.firstName}&nbsp;{followList.lastName}
                                            </Typography>
                                        </div>
                                    </div>

                                    <Button  className="cursor-pointer" size="sm" color="red" onClick={()=>followUnfollow(followList.userId,followList)}>unfollow</Button>

                                </div>
                                )
                            }else{

                                return (
                                    <div className=" flex flex-row justify-between p-3">
                                    <div className="flex flex-row items-center ">

                                        <ListItemPrefix className="cursor-pointer">
                                            <Avatar variant="circular" className="cursor-pointerr" alt="" src={process.env.PROFILE_PIC_URL + followList.profilePic} />
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" className="cursor-pointer" color="blue-gray">
                                                {followList.firstName}&nbsp;{followList.lastName}
                                            </Typography>
                                        </div>
                                    </div>
    
    
                                    </div>
                                )
                            }

                        })}
                    </List>

                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default FollowDialog