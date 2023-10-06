import User from "../models/userModel";

export const userRepository = () => {
  const addUser = async (user:{firstName:string,
    lastName:string,
    userName:string,
    email:string,
    gender:string,
    password:string,
    phoneNumber:number
  }) => {
    const newUser = new User(user);
    return await newUser.save()
  };

  const gooAddUser=async(user:{
    userName:string,
    email:string})=>{

      
      const newUser = new User(user);
      
      return await newUser.save()
      
      
      

  }
  const getUserByEmail=async(email:string)=>{
    return await User.findOne({email})  
    
  }

  const getUserByUserId=async(userId:string)=>{
    return await User.findOne({userId})
  }

  
  return {
    addUser,
    gooAddUser,
    getUserByEmail,
    getUserByUserId
  };
};

export type userDBRepository = typeof userRepository;
