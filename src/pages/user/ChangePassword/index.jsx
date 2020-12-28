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

const ChangePassword = (props) => {
  const {
    buttonLabel,
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
      oldPass: '',
      newPass: '',
      confirm: '',
    },
    validationSchema: Yup.object({
      oldPass: Yup.string()
        .required('Password cannot be empty'),
      newPass: Yup.string()
        .required('New password cannot be empty'),
      confirm: Yup.string()
        .required('Confirm password cannot be empty')
        .oneOf([Yup.ref('newPass')], 'Doesn\'t match the new password.'),
    }),
    // onSubmit: async (value, { setErrors }) => {
    // setIsLoading(true);
    // axios.post(API_HOST + 'change password end point', {
    //   password: value.oldPass,
    //   newPassword: value.newPass,
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
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label>Password:</Label>
              <Input type="password" id="oldPass" name="oldPass" onChange={formik.handleChange} />
              {formik.errors.oldPass && <Label className={css.error}>{`* ${formik.errors.oldPass}`}</Label>}
            </FormGroup>

            <FormGroup>
              <Label>New password:</Label>
              <Input type="password" id="newPass" name="newPass" onChange={formik.handleChange} value={formik.values.newPass} />
              {formik.errors.newPass && <Label className={css.error}>{`* ${formik.errors.newPass}`}</Label>}
            </FormGroup>

            <FormGroup>
              <Label>Confirm password:</Label>
              <Input type="password" id="confirm" name="confirm" onChange={formik.handleChange} value={formik.values.confirm} />
              {formik.errors.confirm && <Label className={css.error}>{`* ${formik.errors.confirm}`}</Label>}
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

export default ChangePassword;
