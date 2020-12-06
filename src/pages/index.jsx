import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { login, selectUser } from '../redux/userSlice';

import css from './index.module.scss';
import { API_END_POINT, API_HOST } from '../utils/constant';

const Login = () => {
  const [user] = useState(useSelector(selectUser));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email cannot be empty'),
      password: Yup.string()
        .required('Password cannot be empty'),
    }),
    onSubmit: async (value, { setErrors }) => {
      setIsLoading(true);
      axios.post(API_HOST + API_END_POINT.USER_LOGIN, {
        username: value.email,
        password: value.password,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(login(res.data));
            toast.success('Login success!');
            router.push('/home');
          }
        })
        .catch(() => {
          setErrors({ password: 'Invalid email or password.' });
        })
        .finally(() => setIsLoading(false));
    },
    validateOnChange: false,
  });

  return (
    <Card className={css.card}>
      <CardBody>
        <CardTitle className={css.title}>
          Login
        </CardTitle>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
            {formik.errors.email && <Label className={css.error}>{`* ${formik.errors.email}`}</Label>}
          </FormGroup>

          <FormGroup>
            <Label>Password:</Label>
            <Input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
            {formik.errors.password && <Label className={css.error}>{`* ${formik.errors.password}`}</Label>}
          </FormGroup>

          <Button type="submit" className={css.button} color="primary">
            {isLoading ? <Spinner color="light" className={css.spinner} /> : 'OK'}
          </Button>
        </Form>
        <hr />
        <Label className={css.create}>
          Create a new account?
          <a className={css.link} href="/sign-up"> Sign up</a>
        </Label>
      </CardBody>
    </Card>
  );
};

export default Login;
