import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CommentSection from "../Comments/CommentDialog";
import { useSelector } from "react-redux";
import { getAllComment, likeFunction } from "../../../api/apiConnection/postConnection";
import { boolean } from "yup";
import moment from "moment";
import {  EllipsisVerticalIcon, TrashIcon,FlagIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



function PostCard({ singlePost }: { singlePost: any }) {

  
  
  
  const userId = useSelector((state: any) => state.user.userId)
  const createdAt = singlePost?.posts?.createdAt
  
  const likeStatus = singlePost?.posts?.like.includes(userId)
  const likeNumCount = singlePost?.posts?.like.length

  const [comments, setComments] = useState([])
  const [likeCount, setLikeCount] = useState(likeNumCount)
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [like, setLike] = useState(likeStatus)
  const [commentCount,setCommentCount]=useState(0)



  useEffect(()=>{
    getCommentCount()
  })

  const navigate=useNavigate()

  const getCommentCount=async()=>{
    const singlePostId = singlePost?.posts?._id
    const response = await getAllComment(singlePostId)
    const commentCount=response.length
    setCommentCount(commentCount)


  }


  const handleOpen = async () => {
    const singlePostId = singlePost?.posts?._id
    const response = await getAllComment(singlePostId)    

    setComments(response)
    setOpen(!open);
  }

  const likePost = async (postId: string) => {
    const response = await likeFunction(userId, postId)
    setLike(response)
    if (response === true) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)

    }
  }






  return (
    <Card className="w-4/5 mx-auto">

      <div>
        <div className="justify-between flex flex-row">
          <div className="flex flex-row gap-4 pl-5 items-center cursor-pointer" onClick={()=> navigate(`/myProfile/${singlePost?.userDetails?._id}`)}>

            <Avatar src={process.env.PROFILE_PIC_URL + singlePost?.userDetails?.profilePic} alt="avatar" />
            <Typography color="blue-gray" className="font-semibold">
              {singlePost?.userDetails?.firstName}&nbsp;{singlePost?.userDetails?.lastName}
            </Typography>
            <Typography className="text-sm">
              {moment(createdAt).calendar()}
            </Typography>
          </div>
          <div  >
            <Menu>
              <MenuHandler>


                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
            
                 
                  <EllipsisVerticalIcon color="black"
                    strokeWidth={2.5}
                    className={`h-6 w-6 transition-transform ${isMenuOpen ? "rotate-180" : ""
                      }`}
                  />
                </Button>

              </MenuHandler>
              <MenuList>
               
                <MenuItem className="flex items-center gap-2">
                 {/* <TrashIcon className="h-4 w-4" color="red"/> */}
                  {/* <Typography variant="small" className="font-normal" color="red">
                    Delete
                  </Typography> */}
                 <FlagIcon className="h-4 w-4"/>

                  <Typography>
                    Report
                  </Typography>
                </MenuItem>


                {/* <hr className="my-2 border-blue-gray-50" />

                <MenuItem className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <Typography variant="small" className="font-normal">
                    Edit Profile
                  </Typography>
                </MenuItem> */}
              
              </MenuList>
            </Menu>
          </div>
        </div><CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={process.env.POST_PIC_URL + singlePost?.posts?.imgVideoURL}
            alt="card-image"
            className="h-full w-full object-cover" />
        </CardHeader><CardBody>
          <div className="flex flex-row gap-3 pb-3">
            {like ? <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" onClick={() => likePost(singlePost?.posts?._id)} stroke-width="0" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={() => likePost(singlePost?.posts?._id)} stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>}


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onClick={handleOpen} stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>

                
            <CommentSection handleOpen={handleOpen} open={open} singlePost={singlePost} comments={comments} setComments={setComments} />
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
          <div className="mb-2 flex items-center gap-3 flex-row ">
            <Typography color="blue-gray" className="font-medium">
              {singlePost?.userDetails?.firstName}&nbsp;{singlePost?.userDetails?.lastName}
            </Typography>
            <Typography
            variant="small"
            color="black"
            className="font-normal opacity-75 break-words w-68"
          >
            {singlePost?.posts?.description}  

          </Typography>

          </div>
          {/* <Typography
            variant="small"
            color="black"
            className="font-normal opacity-75"
          >
            {singlePost?.posts?.description}

          </Typography> */}
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {commentCount} Comments

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
    </Card >
  );
}

export default PostCard