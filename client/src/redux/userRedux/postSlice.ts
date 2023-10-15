import {createSlice} from "@reduxjs/toolkit"


const initialState={
    postDetails:[],
}


const postSlice= createSlice({
    name:'post',
    initialState:initialState,
    reducers:{
        setPostDetails:(state,action)=>{
            state.postDetails=action.payload
        }
    }
})

export const {setPostDetails}=postSlice.actions
export default postSlice.reducer
