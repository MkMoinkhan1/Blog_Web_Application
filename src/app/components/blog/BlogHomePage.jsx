import React, { useEffect } from "react";
import "../../styles/bloghomepage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allBlog, clearBlog } from "../../features/blog/blogSlice";

const BlogHomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const { create_blog_message, all_blog_data, loading, error } = data;
  console.log("data", all_blog_data);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBlog());
    }
    if (create_blog_message) {
      toast.success(create_blog_message);
    }
  }, [create_blog_message, error,dispatch]);

  useEffect(() => {
    dispatch(allBlog());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="center">
          <div className="textcontent">
            <h2>My Blog</h2>
            <button className="blog-btn">
              <Link className="blog-btn-link" to={"/createblog"}>ADD BLOG</Link>
            </button>
          </div>
        </div>
        <div className="blog-card">
          {loading && <div>....loading</div>}
          {Array.isArray(all_blog_data) && all_blog_data.length > 0 ? (
            all_blog_data.map(({ _id, title, description, blogPic, userId,createdAt,like }) => (
              <Link className="blog-home-link" to={`/blogdetails/${_id}`}>
              <div className="card-info" key={_id}>
                <div className="card-info-imgg">
                <img src={`http://localhost:8000${blogPic}`} alt="Cinque Terre" />
                </div>
                <div className="text">
                  <div className="head">
                    <h1>{title}</h1>
                    <p>{createdAt.slice(0,10)}</p>
                  </div>
                  <div className="para">{description}</div>
                  <div className="foot">
                    <h4>{userId.userName}</h4>
                    <p>
                    <i className="far fa-thumbs-up"><span style={{fontSize:"0.7rem",margin:"0 2px"}}>{Math.abs(like)}</span></i>
                      <i className="fa-regular fa-comment"></i>
                    </p>
                  </div>
                </div>
              </div>
              </Link>
            ))
          ) : (
            <div>No blogs found.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogHomePage;


