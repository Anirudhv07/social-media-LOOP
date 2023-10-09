import { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import DialogBox from "./Dialog";

  
  function CreateNewPost() {
    
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);
    return (
      <Menu>
        <MenuHandler>
          <Button className="bg-white w-full text-black ">Create +</Button>
        </MenuHandler>
        <MenuList>
        
          <MenuItem onClick={handleOpen}> Upload </MenuItem>
        
        </MenuList>
          <DialogBox handleOpen={handleOpen} open={open} />
      </Menu>
    );
  }

  export default CreateNewPost