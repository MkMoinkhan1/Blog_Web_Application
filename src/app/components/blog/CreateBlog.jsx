import * as yup from "yup";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { clearBlog, createBlog } from "../../features/blog/blogSlice";

const CreateBlog = () => {

  const [blogPic, setBlogPic] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const { create_blog_message, error } = data;
  const navigate = useNavigate();

  useEffect(() => {

    console.log("this");
    if (error) {
      toast.error(error);
      dispatch(clearBlog());
    }
    if (create_blog_message) {
      toast.success(create_blog_message);
      dispatch(clearBlog());
      navigate("/");
      console.log("this2");
    }
  }, [error, create_blog_message]);

  const initialState = {
    title: "",
    description: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("please enter the title"),
    description: yup.string().required("please enter description"),
  });

  const addUserPic = (e) => {
    setBlogPic(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    console.log(values);
    let obj = {...values ,blogPic:blogPic}
    dispatch(createBlog(obj));
  };

  return (
    <>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="container-lg create-center">
          <Form>
            <div className="form-group my-3">
              <Field
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
                name="title"
              />
            </div>

            <div className="form-group">
              <Field
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="description"
                as="textarea"
                placeholder="Description"
              ></Field>
            </div>
            <div className="p-input">
              <input
                onChange={addUserPic}
                type="file"
                name="blogPic"
                className="upload"
              />
              <p>
                <ErrorMessage name="blogPic" />
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default CreateBlog;
