import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ALL_BLOG, CREATE_BLOG, DELETE_BLOG, DETAILS_BLOG } from "../../server";

let initialState = {
  create_blog_message: "",
  all_blog_message: "",
  all_blog_data : "",
  blog_details_message:"",
  blog_details_data:"",
  blog_like_message:"",
  like:"",
  loading: false,
  error: "",
  comment:[]
};

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (body) => {
    const res = await axios.post(`${CREATE_BLOG}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const allBlog = createAsyncThunk("blog/allBlog", async (thunkAPI) => {
  const res = await fetch(`${ALL_BLOG}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  let data = await res.json();
  if (data.success) {
      console.log('deta2',data);
    return data;
  } else {
    return thunkAPI.rejectWithValue(data);
  }
});

export const blogDetails = createAsyncThunk(
  "blog/blogDetails",
  async (id,thunkAPI)=>{
    const res =await fetch(`${DETAILS_BLOG}${id}`,{
      method:"get",
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    const data =await res.json()
    if(data.success){
      return data
    }else{
      return thunkAPI.rejectWithValue(data)
    }
  }
)

export const deleteBlog= createAsyncThunk(
  "blog/deleteBlog",
  async (id,thunkAPI)=>{
    const res = await axios.delete(`${DELETE_BLOG}${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    },)
    return res.data
  }
)

export const likeBlog = createAsyncThunk(
  "blog/likeBlog",
    async ({id,like})=>{
      const res = await axios.post(`http://localhost:8000/blog/likes/${id}?like=${like}`,null,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      },
      )
      return res.data
    }
)

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearBlog: (state) => {
      state.create_blog_message = "";
      state.all_blog_message = "";
      state.all_blog_data = "";
      state.blog_details_message ="";
      state.blog_details_data="";
      state.blog_like_message="";
      state.like="";
      state.error = "";
      return state;
    },
  },

  extraReducers: {

    /// create blog
    [createBlog.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.create_blog_message = "";
    },
    [createBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.create_blog_message = "";
      } else {
        state.create_blog_message = payload.message;
        state.error = "";
      }
    },
    [createBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      state.create_blog_message = "";
      state.error = payload.error;
    },

    // all blog
    [allBlog.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.all_blog_message = "";
    },
    [allBlog.fulfilled]:(state,{payload})=>{
        state.loading = false
        if(payload.error){
            state.error = payload.error
            state.all_blog_message = ""
        }else{
            state.all_blog_message = payload.message
            state.all_blog_data = payload.blog
            state.error = ""
        }
    },
    [allBlog.rejected]:(state,{payload})=>{
        state.loading = false
        state.error = payload.error
        state.all_blog_message = ""
    },

    // blog details
    [blogDetails.pending]:(state,{payload})=>{
      state.loading = true
      state.error = ""
      state.blog_details_message = ""
      state.blog_details_data = ""
    },
    [blogDetails.fulfilled]:(state,{payload})=>{
      state.loading = false
      if(payload.error){
        state.error = payload.error
        state.blog_details_message = ""
        state.blog_details_data = ""
      }
      else{
        state.blog_details_message = payload.message
        state.blog_details_data = payload.blog
        state.error = ""
      }
    },
    [blogDetails.rejected]:(state,{payload})=>{
      state.loading = false
      state.error = payload.error
      state.blog_details_message = ""
  },
  
    // like blog
    [likeBlog.pending]:(state,{payload})=>{
      state.loading = true
    },
    [likeBlog.fulfilled]:(state,{payload})=>{
      state.loading = false
        state.like = payload.like
        state.error = ""
    },
    [likeBlog.rejected]:(state,{payload})=>{
      state.loading = false
    }
  },
});


export default blogSlice.reducer;
export const { clearBlog } = blogSlice.actions;
