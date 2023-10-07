import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/usersignup.css";
import leftImg from "../../assets/Developer activity.gif";
import { useDispatch, useSelector } from "react-redux";
import { clearBlogState, signUpUser } from "../../features/auth/authSlice";

const UserSignUp = () => {
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { message, error } = data;
  console.log("response", message, error);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBlogState());
    }
    if (message) {
      toast.success(message);
      dispatch(clearBlogState());
      navigate("/signin");
    }
  },[error,message,dispatch,navigate]);
  
  const initialValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userCity: "",
    userState: "",
  };
  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .min(8, "At least 8 character ")
      .required("please enter you name"),
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
      .matches(/[^\w]/, "Password requires a symbol"),
    userPhone: yup.number().required("please enter your phone number"),
    userCity: yup.string().required("please select your city"),
    userState: yup.string().required("please select your state"),
  });
  const addUserPic = (e) => {
    setProfilePic(e.target.files[0]);
  };
  const handleSubmit = (values) => {
    let userObj = { ...values, profilePic: profilePic };
    dispatch(signUpUser(userObj));
    console.log(userObj);
  };

  return (
    <>
     <ToastContainer   />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="signup-main">
          <div className="signup-left">
            <h1>Welcome</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={leftImg} alt="" />
          </div>
          <div className="signup-right">
            <div className="signup-heading">
              <h1>Sign Up</h1>
            </div>
            <div className="signup-formarea">
              <Form className="form">
                <div className="p-input">
                  <Field
                    type="text"
                    name="userName"
                    placeholder="&#xf007;   Username"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  />
                  <p>
                    <ErrorMessage name="userName" />
                  </p>
                </div>
                <div className="p-input">
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
                <div className="p-input">
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

                <div className="p-input">
                  <Field
                    type="number"
                    name="userPhone"
                    placeholder="&#xf095;  Phone Number"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  />

                  <p>
                    <ErrorMessage name="userPhone" />
                  </p>
                </div>

                <div className="p-input">
                  <Field
                    className="select"
                    as="select"
                    type="field"
                    name="userCity"
                  >
                    <option>Please Choose a City</option>
                    <option>Indore</option>
                    <option>Ratlam</option>
                    <option>Ujjain</option>
                    <option>Dewas</option>
                    <option>Khargon</option>
                  </Field>
                  <p>
                    <ErrorMessage name="userCity" />
                  </p>
                </div>

                <div className="p-input">
                  <Field
                    className="select"
                    name="userState"
                    as="select"
                    type="select"
                  >
                    <option>Please Choose a State</option>
                    <option>Madhya Pradesh</option>
                    <option>Uttar Pradesh</option>
                    <option>Andra Pradesh</option>
                    <option>Himachal Pradesh</option>
                    <option>Rajsthan</option>
                  </Field>

                  <p>
                    <ErrorMessage name="userState" />
                  </p>
                </div>
                <div className="p-input">
                  <input
                    onChange={addUserPic}
                    type="file"
                    name="profilePic"
                    className="upload"
                  />
                  <p>
                    <ErrorMessage name="profilePic" />
                  </p>
                </div>
                <button type="submit" className="signup-btn">
                  Sign Up
                </button>
              </Form>
            </div>
            <div className="signup-last">
              <hr className="hr-line" />
              <p>
                I already have an Account?
                <Link to={"/signin"} className="signup-last-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default UserSignUp;
