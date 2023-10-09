import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {
  PhotoIcon
} from "@heroicons/react/24/solid";
import { postImg } from "../../../api/apiConnection/postConnection";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useSelector } from "react-redux";
interface Dialog{
  handleOpen:()=>void,
  open:boolean
}
 
 const DialogBox:React.FC<Dialog> = ({handleOpen,open})=> {

  const [hideFooter,setHideFooter]=useState(false)

  const userId=useSelector((state:any)=>state.user.userId)
   
  const [imgFile,setImgFile]=useState<File|null>(null)
  const [imgURL,setImgURL]=useState('')

  const formik=useFormik({
    initialValues:{
      description:"",
      postImg:""
    },
    validationSchema:Yup.object({
      description:Yup.string()
      .max(100,"Max 100 characters"),
      postImg:Yup.string()
      .required("Required")
    }),onSubmit:async(values)=>{
      console.log(values,'kokokok');
      
      event?.preventDefault()
    
      const response=await postImg(values,userId)
    }
  })

  const handleImageChange=(e:any)=>{
    const selectedImg=e.target.files[0]
    setImgFile(selectedImg)
    formik.setFieldValue("postImg",selectedImg)
    if(selectedImg){
      const reader=new FileReader()
      reader.onload=(e:any)=>{
        const imgDataURL=e.target.result
        setImgURL(imgDataURL)
      }
      reader.readAsDataURL(selectedImg)
    }
    
  }



  

  return (
    <>
      
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>Upload Photo/Video</DialogHeader>
            <form  onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <DialogBody divider >
          <div className="w-full flex flex-col gap-3 ">
          <Input label="Description"  id="description"  type="text" crossOrigin={undefined} 
           {...formik.getFieldProps('description')}/>

          <Input label="Add Image" type="file" name="postImage" id="postImg" crossOrigin={undefined}  onChange={handleImageChange} />

            
            {imgURL?<img src={imgURL} className="mx-auto" alt="" style={{maxWidth:'10rem'}} />:<PhotoIcon className="mx-auto" style={{maxWidth:'15rem'}}/>}
          </div>
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
          {imgURL?<Button variant="gradient" color="green" type="submit"  >
            <span>Confirm</span>
          </Button>:null}
        </DialogFooter>
          </form>
        
      </Dialog>
    </>
  );
}

export default DialogBox