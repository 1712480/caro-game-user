import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import css from './css.module.scss';

const Login = () => {
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
    onSubmit: (value) => {
      // eslint-disable-next-line no-console
      console.log(value);
    },
    validateOnChange: false,
  });

  return (
    <Card className={css.card}>
      <CardTitle className={css.title}>
        Login
      </CardTitle>
      <CardBody>
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

          <Button type="submit" className={css.button} color="primary">Submit</Button>
        </Form>
        <hr />
        <Label className={css.create}>
          Create a new account:
          <a className={css.link} href="/login"> Sign up</a>
        </Label>
      </CardBody>
    </Card>
  );
};

export default Login;
