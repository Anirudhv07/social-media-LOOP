import {createSlice} from "@reduxjs/toolkit"

const getTokenLocal=()=>{
    const token = localStorage.getItem("token")
    if(token){
        return token
    }
}

const getUserNamelocal=()=>{
    const userName = localStorage.getItem("userName")
    if(userName){
        return userName
    }
}

const getUserId=()=>{
    const userId=localStorage.getItem("userId")
    if(userId){
        return userId
    }
}

const getUserProPic=()=>{
    const userProPic=localStorage.getItem("userProPic")
    if(userProPic){
        return userProPic
    }
}

const initialState={
    token:getTokenLocal(),
    userName:getUserNamelocal(),
    // response:[],
    userId:getUserId(),
    userProPic:getUserProPic()
}
const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
            localStorage.setItem("token",action.payload)
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
            localStorage.setItem("userId", action.payload);
        },
        setProfilePic:(state,action)=>{
            state.userProPic=action.payload
            localStorage.setItem("userProPic", action.payload);
        },
        setUserName:(state,action)=>{
            state.userName=action.payload
            localStorage.setItem("userName", action.payload);
        },
        setLogout:(state)=>{
            state.token=""
            state.userName=""
            state.userProPic=""
            state.userId=""
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            localStorage.removeItem("userProPic")

        }
    }
})

export const {setToken,setUserId,setProfilePic,setUserName,setLogout}=userSlice.actions

export default userSlice.reducer