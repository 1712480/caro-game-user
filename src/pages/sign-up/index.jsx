import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import {
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { API_HOST, API_END_POINT } from '../../utils/constant';

import css from '../index.module.scss';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Not a valid Email address')
        .required('Email cannot be empty'),
      password: Yup.string()
        .min(6, 'Minimum length is 6')
        .required('Password cannot be empty'),
      name: Yup.string(),
    }),
    onSubmit: async (value) => {
      setIsLoading(true);
      axios.post(API_HOST + API_END_POINT.USER_CREATE, {
        username: value.email,
        password: value.password,
        name: value.name,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 201) {
            toast.success('Sign Up success!');
            router.push('/');
          }
        })
        .catch((error) => {
          toast.error(error.message ? error.message : 'Sign Up failed, please try again later');
        })
        .finally(() => setIsLoading(false));
    },
    validateOnChange: false,
  });

  return (
    <Card className={css.card}>
      <CardBody>
        <CardTitle className={css.title}>
          Sign Up
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

          <FormGroup>
            <Label>Name:</Label>
            <Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
          </FormGroup>

          <Button type="submit" className={css.button} color="primary">
            {isLoading ? <Spinner color="light" className={css.spinner} /> : 'OK'}
          </Button>
        </Form>
        <hr />
        <Label className={css.create}>
          Already have an account?
          <a className={css.link} href="/"> Log in</a>
        </Label>
      </CardBody>
    </Card>
  );
};

export default SignUp;
