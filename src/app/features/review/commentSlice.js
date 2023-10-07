import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from "../../server";

const initialState = {

  comment_add_message: "",
  comment_add_data: "",
  comment_edit_data: "",
  comment_edit_message: "",
  comment_delete_message: "",
  loading: false,
  error: "",

};

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({id}, thunkAPI) => {
    try {
      const res = await fetch(`${ADD_COMMENT}${id}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await res.json();
      console.log(data);
      return data; // Assuming the response is JSON data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (id, body) => {
    const res =await axios.patch(`${EDIT_COMMENT}${id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return res.data
  }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (id)=>{
        const res = await axios.delete(`${DELETE_COMMENT}${id}`,{})
        return res.data
    }
)

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.comment_add_data = "";
      state.comment_add_message = "";
      state.comment_delete_message = "";
      state.comment_edit_data = "";
      state.comment_edit_message = "";
      state.error = "";
      state.loading = false;
      return state;
    },
  },

  // extra reducer
  [addComment.pending]:(state,{payload})=>{
    
  }
});

export default commentSlice.reducer;
export const { clearComment } = commentSlice.actions;
