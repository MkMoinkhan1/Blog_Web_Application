import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserSignIn from './app/components/auth/UserSignIn'
import UserSignUp from './app/components/auth/UserSignUp'
import BlogHomePage from './app/components/blog/BlogHomePage'
import Layout from './app/components/Layout'
import Error from './app/components/Error'
import CreateBlog from './app/components/blog/CreateBlog'
import BlogDetailed from './app/components/blog/BlogDetailed'
// import MyBlogPage from './app/components/blog/MyBlogPage'
// import BlogComment from './app/components/blog/BlogComment'
import AddComment from './app/components/review/AddComment'
// import { Modal } from '@mui/material'
// import ModalD from './app/components/ModalD'
import ModalW from './app/components/ModalW'
// import


// import { Component } from "react";
// import {Error} from "./app/components/Error";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<BlogHomePage/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/createcomment' element={<AddComment/>}/>
        <Route path='/blogdetails/:id' element={<BlogDetailed/>}/>
        {/* // <Route path='/modal' element={<ModalW/>}/> */}
      </Route>
      <Route path='/signin' element={<UserSignIn/>}/>
      <Route path='/signup' element={<UserSignUp/>}/>
      <Route path="/*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App


// class Demo extends Component{
//   constructor(){
//     super()
//     this.state = {username:"Moin Khan",city:"Istanbul"}
//   }
//   newstate = ()=>{
//     this.setState({username:"Hezbollah"})
//   }
//   oldstate = ()=>{
//     this.setState({username:"Moin Khan",city:"Istanbul"} )
//   }
//   render(){ 
//     const {username,city} = this.state
//     return(
//       <>
//       <h1>{username} organization Ninjas Studio in {city}</h1>
//       <button onClick={this.newstate}>Click Kar de</button>
//       <button onClick={this.oldstate}>Click Kar de ek or bar</button>
//       <Error name = {username}/>
//       </>
//     )
//   }
// }
// export default Demo