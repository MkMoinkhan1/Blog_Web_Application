import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

const CompanyReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.blog);
  const { review_msg, error, loading } = data;
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      toast.error(error);
    //   dispatch(clearReviewState());
    }
    if (review_msg) {
      toast.success(review_msg);
    //   dispatch(clearReviewState());
      navigate(`/reviewpage/${id}`);
    }
  }, [error, review_msg]);
  const defaultValues = {
    comment: "",
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().required("please enter comment"),
  });
  const handleSubmit = (value, action) => {
    // console.log(value)
    const user = JSON.parse(localStorage.getItem("user"));
    const review_obj = { ...value, user_id: user._id, company_id: id };
    // console.log("Before dispatch",review_obj)
    // dispatch(companyReview(review_obj));
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div>
        <div className="container mt-5">
          <h2 className="mb-3 text-center">Company Review</h2>
          <Form>
           
          <div className="mb-3 p-input">
              <Field
                className="form-control"
                type="text"
                name="review"
                placeholder="review"
              />
              <p ><ErrorMessage name="review"/></p>
            </div>
            <div className="mb-3 p-input">
              <Field
                className="form-control"
                as="select"
                name="rating"
                type="field"
                placeholder="rating"
              >  
              <option>please select rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              </Field>
              <p><ErrorMessage name="rating"/></p>
            </div>
            <div className="mb-3 p-input">
              <Field
                className="form-control"
                name="subject"
                as="textarea"
                placeholder="Review"
                rows="7"
              />
               <p><ErrorMessage name="subject"/></p>
            </div>
            <button className="btn btn-danger" type={"submit"}>
              Submit
            </button>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default CompanyReview;
