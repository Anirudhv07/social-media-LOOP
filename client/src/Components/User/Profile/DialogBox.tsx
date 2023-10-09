import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { setProPic } from "../../../redux/userRedux/slice";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { changeProPic } from "../../../api/apiConnection/homeConnection";
import { useDispatch, useSelector } from "react-redux";

interface Dialog{
    handleOpen:()=>void,
    open:boolean
}
 
const DialogBox:React.FC<Dialog>=({handleOpen,open})=> {
const{userProPic}=useSelector((store:{user:{userProPic:string}})=>store.user)
  const userId=useSelector((state:any)=>state.user.userId)
  const dispatch=useDispatch()
    const [imgURL,setImgURL]=useState('')
    const [imageFile,setImageFile]=useState<File|null>(null)

    const handleImageChange=(e:any)=>{
        const selectedImg=e.target.files[0]
        
        setImageFile(selectedImg)
        if(selectedImg){
            const reader=new FileReader()
            reader.onload=(e:any)=>{
                const imgDataURL=e.target.result
                setImgURL(imgDataURL)
            }
      reader.readAsDataURL(selectedImg)

        }
    }

    const handleOpenDialog=()=>{
      setImageFile(null)
      handleOpen()
    }

    const handleSubmit=async(event)=>{
      event?.preventDefault()

        const response=await changeProPic(imageFile!,userId)
     
        
        dispatch(setProPic(response.data))
        handleOpenDialog()

    }
 
  return (
    
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

        <DialogBody divider>
        <input type="file" name="profilePic" id="profilePic" onChange={handleImageChange} />

            
{imgURL?<img src={imgURL} className="mx-auto" alt=""  style={{maxWidth:'10rem'}} />:<PhotoIcon className="mx-auto" style={{maxWidth:'15rem'}}/>}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" type="submit">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
          </form>
      </Dialog>
   
  );
}

export default DialogBox