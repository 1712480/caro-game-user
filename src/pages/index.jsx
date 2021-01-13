import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

import { login, selectUser } from '../redux/userSlice';
import { API_END_POINT, API_HOST, GOOGLE_CLIENT_ID, ROUTE } from '../utils/constant';
import css from './index.module.scss';

const Login = () => {
  const [user] = useState(useSelector(selectUser));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push(ROUTE.HOME);
    }
  }, [router, user]);

  const loginSuccess = (data) => {
    dispatch(login(data));
    toast.success('Login success!');
    return router.push(ROUTE.HOME);
  };

  const googleLoginSuccess = (response) => {
    const { email, name } = response.profileObj;

    axios.post(API_HOST + API_END_POINT.USER_LOGIN, {
      username: email,
      password: name,
      fullName: name,
      isNormalFlow: false,
    })
      .then((res) => {
        if (res.status === 200) {
          loginSuccess(res.data);
        } else if (res.status === 201) {
          router.push({
            pathname: ROUTE.ACTIVATE_ACCOUNT,
            query: {
              email,
            },
          });
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message?.msgBody || 'Something occurred, please try again later!');
      })
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line no-console
  const googleLoginFail = (err) => console.log(err);

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
        isNormalFlow: true,
      })
        .then((res) => {
          if (res.status === 200) {
            loginSuccess(res.data);
          }
        })
        .catch((e) => {
          if (e?.response?.status === 501) {
            if (e.response.data.message.msgBody === 'User has been blocked by admin!') {
              toast.error(e.response.data.message.msgBody);
            } else {
              router.push({
                pathname: ROUTE.ACTIVATE_ACCOUNT,
                query: {
                  email: value.email,
                  isNormalFlow: true,
                },
              });
            }
          } else {
            setErrors({ password: 'Invalid email or password.' });
          }
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

          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFail}
            className={css.google}
            isSignedIn={false}
            cookiePolicy="single_host_origin"
          />
        </Form>
        <hr />
        <Label className={css.create}>
          Create a new account?
          <Link className={css.link} href={ROUTE.SIGN_UP}> Sign up</Link>
        </Label>
        <Label className={css.create}>
          <Link className={css.link} href={ROUTE.FORGOT_PASSWORD}>Forgot your password?</Link>
        </Label>
      </CardBody>
    </Card>
  );
};

export default Login;
