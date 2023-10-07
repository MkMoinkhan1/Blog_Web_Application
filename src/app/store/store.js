import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authSlice from "../features/auth/authSlice";
import blogSlice from "../features/blog/blogSlice";


const store = configureStore(
    {
        reducer:{
            user:authSlice,
            blog:blogSlice
        }
    },
    applyMiddleware(thunk)
)

export default store
