import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { deleteThisComment } from "../../../api/apiConnection/postConnection";
 
interface Delete{
    handleOpen: () => void,
    open: boolean,
    commentId:string,
    setComments:any,
    comments:any
}

const DeleteComment:React.FC<Delete>=({handleOpen,open,commentId,comments,setComments})=> {
  
    const deleteComment=async(commentId:string)=>{
        const response=await deleteThisComment(commentId)
        if(response.status=='Success'){
            const commentAfterDeletion=comments.filter((comment:any)=>comment._id !==commentId)
            setComments(commentAfterDeletion)
            handleOpen()
        }
        
    }           
 
  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Are you sure you want to delete?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={()=>deleteComment(commentId)}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteComment