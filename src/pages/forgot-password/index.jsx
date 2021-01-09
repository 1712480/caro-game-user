import React, { useState } from 'react';
import {
  CardTitle,
  Container,
  Card,
  Input,
  Button,
  Spinner,
  Label,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_END_POINT, API_HOST } from '../../utils/constant';

import css from './css.module.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Not a valid Email address')
        .required('Email cannot be empty'),
    }),
    onSubmit: async (value) => {
      setIsLoading(true);
      axios.post(API_HOST + API_END_POINT.RESEND_OTP, {
        email: value.email,
        resetAccount: true,
      })
        .then((res) => {
          const { message } = res?.data;
          toast.success(message?.msgBody);
          router.push({
            pathname: '/activate-account',
            query: {
              email: value.email,
              isNormalFlow: false,
            },
          });
        })
        .catch((error) => {
          toast.error(error.response?.message || 'Failed, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    validateOnChange: false,
  });

  return (
    <Container className={css.container}>
      <Card className={css.card}>
        <CardTitle>What is your email?</CardTitle>
        <form onSubmit={formik.handleSubmit}>
          <Input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && <Label className={css.error}>{`* ${formik.errors.email}`}</Label>}
          <Button type="submit" className={css.button} color="primary">
            {isLoading ? <Spinner color="light" className={css.spinner} /> : 'OK'}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
