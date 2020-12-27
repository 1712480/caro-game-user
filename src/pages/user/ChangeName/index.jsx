import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input, Spinner, Form,
} from 'reactstrap';
import * as Yup from 'yup';

import css from '../../index.module.scss';

const ChangeName = (props) => {
  const {
    className,
  } = props;

  const ctaStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const buttonStyle = {
    width: '100px',
  };

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      newName: '',
    },
    validationSchema: Yup.object({
      newName: Yup.string()
        .required('Name cannot be empty'),
    }),
    // onSubmit: async (value, { setErrors }) => {
    // setIsLoading(true);
    // axios.post(API_HOST + 'change name end point', {
    //   newName: value.newName,
    //   token: ,
    // })
    //   .then((res) => {
    //     }
    //   })
    //   .catch(() => {
    //   })
    //   .finally(() => setIsLoading(false));
    // },
    onSubmit: () => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    },
    validateOnChange: false,
  });

  const toggle = () => {
    formik.resetForm();
    setModal(!modal);
  };

  return (
    <>
      <img alt="edit" src="/edit.svg" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Change name</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label>New name:</Label>
              <Input type="text" id="newName" name="newName" onChange={formik.handleChange} />
              {formik.errors.newName && <Label className={css.error}>{`* ${formik.errors.newName}`}</Label>}
            </FormGroup>
            <div style={ctaStyle}>
              <Button style={buttonStyle} type="submit" color="primary">{isLoading ? <Spinner color="light" className={css.spinner} /> : 'OK'}</Button>
              <Button style={buttonStyle} color="secondary" onClick={toggle}>Cancel</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ChangeName;
