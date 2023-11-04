import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    Typography,
    Input,
    textarea,
} from "@material-tailwind/react";
import moment, { Moment } from "moment"
import {
    XMarkIcon,
    HeartIcon
} from "@heroicons/react/24/solid";
import UserComments from "./UserComments";
import { useSelector } from "react-redux";
import { addNewComment } from "../../../api/apiConnection/postConnection";

interface Dialog {
    handleOpen: () => void,
    open: boolean,
    singlePost: any,
    comments:any,
    setComments:any
}
const CommentSection: React.FC<Dialog> = ({ handleOpen, open, singlePost,comments,setComments }) => {
  console.log(singlePost,'jj');
  
    
    const textAreaRef=useRef<HTMLInputElement | null>(null)


    const [commentText,setCommentText]=useState('')
    const [replyToUser,setReplyToUser]=useState('')
    const [replyToUserName,setReplyToUserName]=useState('')
    const [commentID,setCommentID]=useState('')
    


    const {userId,userProPic,firstName,lastName,userName}=useSelector((state:any)=>state.user)
    
    const focusTextAreaReply=(commentedUserId:string,commentedUser:string,commentId:string)=>{
       
        
        if(textAreaRef.current){
            textAreaRef.current.focus()
            setCommentText(`@${commentedUser} `)
            setReplyToUser(commentedUserId)
            setReplyToUserName(commentedUser)

            setCommentID(commentId)
            
        }
    }

    const addComment=async(postId:any)=>{
        
        event?.preventDefault()
        if(commentText.trim()!==""){

            
         const response=await addNewComment(postId,userId,commentText,commentID,replyToUser,replyToUserName,userProPic)
        
    
        if (response.comment==true) {
           const result=response.response
            result.userDetails = {  // Create a new userDetails object
                profilePic: userProPic,
                firstName: firstName,
                lastName: lastName,
                userName:userName
            };
            
        
            setCommentText("");
            setComments((prev: any) => [...prev, result]);
        
        }
        else{
            
            const replyData=comments.map((eachComment:any)=>{
              if(eachComment._id===commentID){
           const result=response.response

                result.userDetails = {  // Create a new userDetails object
                    profilePic: userProPic,
                    firstName: firstName,
                    lastName: lastName,
                    userName:userName
                };
                return{
                    ...eachComment,reply:[...eachComment.reply,result]
                }
              }
              return eachComment
            })
            setComments(replyData)
        }
        setCommentText("");

        
        
            
            
        }
        if(textAreaRef?.current){
            textAreaRef.current.focus()
        }
    }

    
    


    return (
        <>



            <Dialog open={open} size="xl" className="rounded-none w-full" handler={handleOpen} style={{ border: 'none', height: '600px' }}>
                <div className="flex justify-between rounded-none h-full">
                    <div className="w-3/5 h-full flex items-center justify-center bg-black">
                        <div className="overflow-hidden h-full w-full flex items-center justify-center">
                            <img
                                src={process.env.POST_PIC_URL + singlePost?.posts?.imgVideoURL}
                                alt=""
                                className="max-h-full max-w-full"
                            />
                        </div>
                    </div>
                    <div className="flex-flex-col w-2/5  flex-wrap">
                        <div className="justify-between flex flex-row">
                            <div className="flex flex-row m-3 gap-3 items-center">
                                <Avatar variant="circular" alt="" src={process.env.PROFILE_PIC_URL + singlePost?.userDetails?.profilePic} />

                                <div className="cursor-pointer">
                                    <Typography variant="h6" className="cursor-pointerr" color="blue-gray">
                                    {'@'+singlePost?.userDetails?.userName}
                                    </Typography>
                                </div>
                            </div>
                            <div className="h-6 w-6 m-2 cursor-pointer" onClick={handleOpen}>
                                <XMarkIcon color="black" />
                            </div>

                        </div>

                        <hr className="my-2 border-blue-gray-100" />

                        <div className="overflow-y-scroll h-3/4">
                            <div className="flex flex-col m-3 ">
                                <div className="flex flex-row  gap-3 items-center">
                                    <Avatar variant="circular" alt="" src={process.env.PROFILE_PIC_URL + singlePost?.userDetails?.profilePic} />

                                    <div className="cursor-pointer">
                                        <Typography variant="h6" className="cursor-pointer" color="blue-gray">
                                        {'@'+singlePost?.userDetails?.userName}

                                        </Typography>
                                    </div>
                                    <div className="break-words w-68" >
                                        {singlePost?.posts?.description}
                                    </div>

                                </div>
                                <div className="text-sm pt-4 flex flex-row justify-start gap-5">
                                    {moment(singlePost?.posts?.createdAt).calendar()}

                                </div>
                            </div>

                            <div>
                            {comments.map((singleComment:any)=>{
                                return(

                                    <UserComments singleComment={singleComment} focusTextAreaReply={focusTextAreaReply} setComments={setComments} comments={comments}/>
                                )
                            })}

                            </div>
                        </div>
                        <div className="px-3">
                            <div className="relative flex w-full">
                                <form action="" onSubmit={()=>addComment(singlePost?.posts?._id)}>

                                    <Input
                                        type="comment"
                                        label="Add Comment"
                                        ref={textAreaRef}
                                       value={commentText}
                                       onChange={(e)=>setCommentText(e.target.value)}

                                        className="pr-20"
                                        containerProps={{
                                            className: "min-w-0 ",
                                        }} crossOrigin={undefined} />
                                    <Button
                                        size="sm"
                                        color="purple"
                                        type="submit"
                                        className="!absolute right-1 top-1 rounded"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>





        </>

    );
}

export default CommentSection