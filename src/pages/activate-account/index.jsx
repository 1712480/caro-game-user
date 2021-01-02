import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Container, Card, CardTitle, Input, Button, FormGroup, Spinner, Label } from 'reactstrap';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_END_POINT, API_HOST } from '../../utils/constant';

import css from './style.module.scss';

const ActivateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isNormalFlow, email } = router.query;

  const initialValues = isNormalFlow ? {
    otp: '',
  } : {
    otp: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = isNormalFlow ? Yup.object({
    otp: Yup.string()
      .required('OTP field cannot be empty.'),
  }) : Yup.object({
    otp: Yup.string()
      .required('OTP field cannot be empty.'),
    password: Yup.string()
      .min(6, 'Minimum length is 6')
      .required('Password cannot be empty'),
    confirmPassword: Yup.string()
      .required('Confirm password cannot be empty')
      .oneOf([Yup.ref('password')], 'Doesn\'t match the password.'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (value) => {
      setIsLoading(true);
      axios.post(API_HOST + API_END_POINT.CHECK_OTP, {
        otp: value.otp,
        password: value.password,
        email,
      })
        .then((res) => {
          const { message } = res.data;
          toast.success(message.msgBody);
          router.push('/');
        })
        .catch((error) => {
          const { data } = error.response;
          toast.error(data.message.msgBody ? data.message.msgBody : 'Activate failed, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    validateOnChange: false,
  });

  const renderPasswordFields = isNormalFlow ? null : (
    <>
      <FormGroup>
        <CardTitle>
          Create your password:
        </CardTitle>
        <Input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        {formik.errors.password && <Label className={css.error}>{`* ${formik.errors.password}`}</Label>}
      </FormGroup>
      <FormGroup>
        <CardTitle>
          Confirm password
        </CardTitle>
        <Input type="password" id="confirmPassword" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} />
        {formik.errors.confirmPassword && <Label className={css.error}>{`* ${formik.errors.confirmPassword}`}</Label>}
      </FormGroup>
    </>
  );

  return (
    <Container className={css.container}>
      <Card className={css.card}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <CardTitle>
              Your account need activation. Please check your email and use the OTP we sent!
            </CardTitle>
            <Input type="number" placeholder="otp" id="otp" name="otp" onChange={formik.handleChange} value={formik.values.otp} />
            {formik.errors.otp && <Label className={css.error}>{`* ${formik.errors.otp}`}</Label>}
          </FormGroup>
          {renderPasswordFields}
          <Button color="success" type="submit" className={css.submit}>{isLoading ? <Spinner /> : 'OK'}</Button>
        </form>
      </Card>
    </Container>
  );
};

export default ActivateAccount;
