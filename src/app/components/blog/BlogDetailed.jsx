import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  blogDetails,
  clearBlog,
  deleteBlog,
  likeBlog,
} from "../../features/blog/blogSlice";
import { toast } from "react-toastify";
import ModalForm from "../review/ModalD";
import { Dropdown,Menu, MenuButton, MenuItem } from "@mui/joy";
// import { IconButton } from "@mui/material";
// import Dropdown from '@mui/joy/Dropdown';
// import IconButton from '@mui/joy/IconButton';
// import Menu from '@mui/joy/Menu';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';
import MoreVert from "@mui/icons-material/MoreVert";

const BlogDetailed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [like, setLiked] = useState();
  // const [execute, setExecute] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate()

  // console.log(id);

  const data = useSelector((state) => state.blog);
  const { blog_details_data, blog_details_message, error } = data;

  const body = {
    id: id,
    like: like,
  };
  const handleClicked = () => {
    setLiked(!like);
    // setExecute("true");
    dispatch(likeBlog(body));
  };

  useEffect(() => {
    if (blog_details_message) {
      toast.success(blog_details_message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearBlog());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(blogDetails(id));
  }, [dispatch]);

  const handleDelete = ()=>{
    dispatch(deleteBlog(id))
    navigate("/")
  }

  const { title, description, blogPic, userId, createdAt } = blog_details_data;
  const handleFormSubmit = (values) => {
    console.log(values); // You can handle the form data here (e.g., send it to an API).
    setIsModalOpen(false); // Close the modal after form submission
  };
  return (
    <section>
      <div className="blog-details-main">
        <div className="three-dot-icon">
          <Dropdown>
            <MenuButton>
             <i class="fas fa-ellipsis-v" style={{color:"#989ba4"}}></i>
            </MenuButton>
            <Menu>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem>Edit</MenuItem>
            </Menu>
          </Dropdown>
        </div>
        <div className="img-container">
          <img src={`http://localhost:8000${blogPic}`} alt="Main Im" />
        </div>
        <div className="blog-details-heading">
          <h1>{title}</h1>
          <div className="blog-heading-2">
            <p>created By</p>
            <h4>{userId && userId.userName}</h4>
            <p>{createdAt && createdAt.slice(0, 10)}</p>
          </div>
        </div>
        <div className="blog-details-para-area">
          <p>{description}</p>
        </div>
        <div className="last-blog-details">
          <i
            className="fa-regular fa-comment"
            onClick={() => setIsModalOpen(true)}
          ></i>
          <ModalForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
          />
          {like ? (
            <i className="fas fa-thumbs-up" onClick={handleClicked}></i>
          ) : (
            <i className="far fa-thumbs-up" onClick={handleClicked}></i>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailed;
