import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/review/commentSlice';
import { useParams } from 'react-router-dom';

const initialValues = {
  comment: '',
};

const validationSchema = Yup.object({
  comment: Yup.string().required('Comment is required'),
});

const ModalForm = ({ isOpen, onClose, onSubmit }) => {
    const {id} = useParams()
    const dispatch=useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
        const obj = {...values,id}
      dispatch(addComment(obj));
      onClose(); // Close the modal after form submission
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const modalStyle = {
    maxWidth: '800px', // Increase the maxWidth
    width: '90%', // Increase the width
    margin: '0 auto',
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '100px',
    padding: '8px',
    fontSize: '16px',
  };

  return (
    <Dialog open={isOpen} onClose={onClose} style={modalStyle}>
      <DialogTitle>Add Comment</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              style={textareaStyle}
              {...formik.getFieldProps('comment')}
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div style={{ color: 'red' }}>{formik.errors.comment}</div>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalForm;
