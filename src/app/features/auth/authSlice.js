import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SIGN_IN, SIGN_UP } from "../../server"; 

let initialState = {
    message: "",
    loading: false,
    error: "",
    token:"",
    user:""
  };

  export const signUpUser = createAsyncThunk(

    "user/signUpUser",
    async (body,ThunkAPI)=>{
        const res = await axios.post(`${SIGN_UP}`,body,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        if(res.data.success){
            console.log("thunk response",res.data)
            return res.data
        }else{
            return ThunkAPI.rejectWithValue(res.data)
        }
    }
  )

  export const signInUser = createAsyncThunk(

    "user/signInUser",
    async (body,ThunkAPI)=>{
        const res = await axios.post(`${SIGN_IN}`,body,{
            headers:{
                Accept:"application/json",
                'Content-Type':"application/json"
            }
        })
        
        if(res.data.success){
            console.log("thunk res",res.data);
            return res.data
        }else{
            return ThunkAPI.rejectWithValue(res.data)
        }
    }
  )

  const authSlice = createSlice({

    name:"user",
    initialState,
    reducers:{
        clearBlogState:(state)=>{
            state.message = "";
            state.user = "";
            state.token = "";
            state.loading = false;
            state.error = "";
            return state;
        }
    },

    extraReducers:{
        [signUpUser.pending]:(state,{payload})=>{
            state.loading=true
            state.error = ""
            state.message = ""
        },
        [signUpUser.fulfilled]:(state,{payload})=>{
            state.loading = false
            if(payload.error){
                state.error = payload.error
                state.message = ""
            }else{
                state.message = payload.message
                state.error=""
            }
        },
        [signUpUser.rejected]:(state,{payload})=>{
            state.loading =false
            state.error = payload.error
            state.message = ""
        },

        // sign In extrareducer
        [signInUser.pending]:(state)=>{
            state.loading = true
            state.message = ""
            state.error = ""
        },
        [signInUser.fulfilled]:(state,{payload})=>{
            state.loading = false
            if(payload.error){
                state.error = payload.error
                state.message = ""
            }
            if(payload.success){
                state.error = ""
                state.message = payload.message
                state.user = payload.userData
                state.token  =payload.accessToken
                localStorage.setItem("message",payload.message)
                localStorage.setItem("user",JSON.stringify(payload.userData))
                localStorage.setItem("token",payload.accessToken)
            }
        },
        [signInUser.rejected]:(state,{payload})=>{
            console.log('extareducer error', payload.error);
            state.loading = false
            state.error = payload.error
            state.message = ""
        },       
    }
  })

  export default authSlice.reducer;
  export const {clearBlogState} = authSlice.actions
