import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const navigate =useNavigate()
  let isActive = false;
  const handleLogOut = ()=>{
    localStorage.clear()
    isActive = false
    navigate("/signin")
  }
  return (
    <header>
      <Link to={"/"} className="heading">
        Blog<span>Press.</span>
      </Link>
      <ul>
        <div className="ul-link">
          <Link to={"/"}>My Blogs</Link>
          <Link href={"/"}>All Blogs</Link>
        </div>
        <button className="nav-btn btn1"><Link to={"/signin"} className="nav-btn-link">{isActive===true ?<button style={{border:"none",background:"transparent"}}>Login/SignUp</button>:<button style={{border:"none",background:"transparent"}} onClick={handleLogOut}>Logout</button>}</Link></button>
      </ul>
    </header>
  );
};

export default Navbar;



