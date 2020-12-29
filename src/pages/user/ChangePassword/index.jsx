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

import axios from 'axios';
import { toast } from 'react-toastify';
import css from '../../index.module.scss';
import { API_HOST, API_END_POINT } from '../../../utils/constant';

const ChangePassword = (props) => {
  const {
    buttonLabel,
    className,
    user,
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
        .min(6, 'Minimum length is 6')
        .required('New password cannot be empty'),
      confirm: Yup.string()
        .required('Confirm password cannot be empty')
        .oneOf([Yup.ref('newPass')], 'Doesn\'t match the new password.'),
    }),
    onSubmit: async (value) => {
      setIsLoading(true);
      axios.post(API_HOST + API_END_POINT.USER_CHANGE_PASSWORD, {
        oldPassword: value.oldPass,
        newPassword: value.newPass,
      }, {
        headers: {
          access_token: user?.access_token,
        },
      })
        .then((res) => {
          const { message } = res.data;
          toast.success(message.msgBody);
          // eslint-disable-next-line no-use-before-define
          toggle();
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => setIsLoading(false));
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
