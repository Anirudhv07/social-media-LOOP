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

const getFirstNamelocal=()=>{
    const firstName = localStorage.getItem("firstName")
    if(firstName){
        return firstName
    }
}

const getLastNamelocal=()=>{
    const lastName = localStorage.getItem("lastName")
    if(lastName){
        return lastName
    }
}

const getUserId=()=>{
    const userId=localStorage.getItem("userId")
    if(userId){
        return userId
    }
}

const getUserEmail=()=>{
    const userEmail=localStorage.getItem("email")
    if(userEmail){
        return userEmail
    }
}

const getUserBio=()=>{
    const userBio=localStorage.getItem("userBio")
    if(userBio){
        return userBio
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
    firstName:getFirstNamelocal(),
    lastName:getLastNamelocal(),
    followerCount:0,
    followingCount:0,
    bio:getUserBio(),
    email:getUserEmail(),
    suggestedPeople:[],
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
        setFirstName:(state,action)=>{
            state.firstName=action.payload
            localStorage.setItem("firstName", action.payload);
        },
        setLastName:(state,action)=>{
            state.lastName=action.payload
            localStorage.setItem("lastName", action.payload);
        },
        setProPic:(state,action)=>{
            state.userProPic=action.payload
            localStorage.setItem('userProPic',action.payload)
        },
        setUserBio:(state,action)=>{
            state.bio=action.payload
            localStorage.setItem('userBio',action.payload)
        },
        setUserEmail:(state,action)=>{
            state.email=action.payload
            localStorage.setItem('email',action.payload)
        },
        setFollowerCount:(state,action)=>{
            state.followerCount=action.payload
        },
        setFollowingCount:(state,action)=>{
            state.followingCount=action.payload
        },
        setSuggestedPeople:(state,action)=>{
            state.suggestedPeople=action.payload
        },
        
        setLogout:(state)=>{
            state.token=""
            state.userName=""
            state.firstName=""
            state.lastName=""
            state.userProPic=""
            state.userId=""
            state.bio=""
            state.email=""
            state.followerCount=0
            state.followingCount=0
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            localStorage.removeItem("userProPic")
            localStorage.removeItem("userBio")
            localStorage.removeItem("email")


        }
    }
})



export const {setToken,setUserId,setProfilePic,setUserBio,setLastName,setFirstName,setUserName,setLogout,setProPic,setFollowerCount,setUserEmail,setFollowingCount,setSuggestedPeople}=userSlice.actions

export default userSlice.reducer