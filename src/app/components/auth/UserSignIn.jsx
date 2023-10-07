import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/usersignin.css";
import leftImg from '../../assets/Developer activity.gif'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearBlogState, signInUser } from "../../features/auth/authSlice";
const UserSignIn = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const {message,error}=data
  console.log('data', message, error);
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearBlogState())
    }
    if(message){
      toast.success(message)
      dispatch(clearBlogState())
      navigate("/")
    }
  
   
  }, [message,error])
  
  const initialValues = {
    userEmail: "",
    userPassword: "",
  };
  const validationSchema = yup.object().shape({
    userEmail: yup
      .string()
      .email("enter the correct email")
      .required("please enter the email"),
    userPassword: yup
      .string()
      .required("please enter the password")
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")  });
  const handleSubmit = (values) => {
    dispatch(signInUser(values))
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="signin-main">
          <div className="signin-left">
            <h1>Welcome</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={leftImg} alt="" />
          </div>
          <div className="signin-right">
            <div className="signin-heading">
              <h1>Sign In</h1>
            </div>
            <div className="signin-formarea">
              <Form className="form">
             
                <div className="signin-p-input">
                  <Field
                    type="email"
                    name="userEmail"
                    placeholder="&#xf0e0;   Email"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  />
                  <p>
                    <ErrorMessage name="userEmail" />
                  </p>
                </div>
                <div className="signin-p-input">
                  <Field
                    type="text"
                    name="userPassword"
                    placeholder="&#xf023;  Password" 
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  />

                  <p>
                    <ErrorMessage name="userPassword" />
                  </p>
                </div>
                <button type="submit" className="signin-btn">
                  Sign In
                </button>
              </Form>
            </div>
            <div className="signin-last">
              <hr className="hr-line" />
              <p>
                I already have an Account?
                <Link to={"/signup"} className="signin-last-link">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default UserSignIn;
