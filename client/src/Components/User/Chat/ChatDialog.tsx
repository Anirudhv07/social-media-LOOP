import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { boolean } from "yup";
import ChattedUser from "./ChattedUser";
import ChattingArea from "./ChattingArea";
import { XMarkIcon } from "@heroicons/react/24/solid";
 
interface dialog{
    handleOpen:()=>void,
    open:boolean
}
const ChatBox:React.FC<dialog>=({handleOpen,open})=> {
  
 
  return (
    <>
      
      <Dialog open={open} size="xl" handler={handleOpen}>
        
        <DialogBody>
         <div className="flex flex-row">
            <div className="w-1/3">
            <Typography variant="h4" color="blue-gray">
              Messages
            </Typography>
                <ChattedUser />
                

            </div>
            <div className="w-2/3">
                    <ChattingArea />
            </div>
            <div className="h-6 w-6 m-2 cursor-pointer" onClick={handleOpen}>
                                <XMarkIcon color="black" />
                            </div>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ChatBox