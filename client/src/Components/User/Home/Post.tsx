import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CommentSection from "../Comments/CommentDialog";
import { useSelector } from "react-redux";
import { getAllComment, likeFunction } from "../../../api/apiConnection/postConnection";
import { boolean } from "yup";
import moment from "moment";


function PostCard({ singlePost }: { singlePost: any }) {

  const [comments,setComments]=useState([])
  const userId=useSelector((state:any)=>state.user.userId)
  const createdAt=singlePost?.posts?.createdAt
 


  const [open, setOpen] = useState(false);


    const likeStatus=singlePost?.posts?.like.includes(userId)
    const likeNumCount=singlePost?.posts?.like.length
    
    
    const[likeCount,setLikeCount]=useState(likeNumCount)

 
  const[like,setLike]=useState(likeStatus)


 
  const handleOpen = async() =>{
    const singlePostId=singlePost?.posts?._id
    const response=await getAllComment(singlePostId)
    
    setComments(response)
    setOpen(!open);
  } 

  const likePost=async(postId:string)=>{   
    const response=await likeFunction(userId,postId)
    setLike(response)
    if(response===true){
      setLikeCount(likeCount+1)
    }else{
      setLikeCount(likeCount-1)

    }
  }

 
  


  return (
    <Card className="w-4/5 mx-auto">

      <div>
        <div className="flex flex-row gap-4 pl-5 items-center">
          <Avatar src={process.env.PROFILE_PIC_URL + singlePost?.userDetails?.profilePic} alt="avatar" />
          <Typography color="blue-gray" className="font-semibold">
            {singlePost?.userDetails?.firstName}&nbsp;{singlePost?.userDetails?.lastName}
          </Typography>
          <Typography className="text-sm">
            {moment(createdAt).calendar()}
          </Typography>
        </div><CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={process.env.POST_PIC_URL + singlePost?.posts?.imgVideoURL}
            alt="card-image"
            className="h-full w-full object-cover" />
        </CardHeader><CardBody>
          <div className="flex flex-row gap-3 pb-3">
            {like? <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" onClick={()=>likePost(singlePost?.posts?._id)} stroke-width="0" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={()=>likePost(singlePost?.posts?._id)} stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>}

           
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={handleOpen} stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>

          <CommentSection handleOpen={handleOpen} open={open} singlePost={singlePost} comments={comments} setComments={setComments}/>
          </div>

          <Typography className="flex flex-row items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <p style={{ color: 'gray', fontSize: '13px' }} >
              Liked by
            </p>
            <p style={{ color: 'black' }}>
              {likeCount}
              <span style={{ color: 'gray', fontSize: '13px' }}> users</span>
            </p>
          </Typography>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {singlePost?.userDetails?.firstName}&nbsp;{singlePost?.userDetails?.lastName}
            </Typography>

          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {singlePost?.posts?.description}

          </Typography>
        </CardBody>


      </div>

      {/* <CardFooter className="pt-0">
      <Button
        ripple={false}
        fullWidth={true}
        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      >
        Add to Cart
      </Button>
    </CardFooter> */}
    </Card>
  );
}

export default PostCard