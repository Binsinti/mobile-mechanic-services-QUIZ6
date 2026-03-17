import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from '../actions/authActions';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    location: '',
    gender: 'Male',
    password: '',
    confirm_password: '',
  });

  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.auth);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) return;
    dispatch(register(form));
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <Container className="py-4" style={{ maxWidth: 700 }}>
      <Card className="p-4">
        <h3 className="mb-3">Create Account</h3>
        {error && <Alert variant="danger">{String(error)}</Alert>}
        <Form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-md-6"><Form.Control name="email" placeholder="Email" type="email" onChange={onChange} required /></div>
            <div className="col-md-6"><Form.Control name="username" placeholder="Username" onChange={onChange} required /></div>
            <div className="col-md-6"><Form.Control name="phone_number" placeholder="Phone Number" onChange={onChange} required /></div>
            <div className="col-md-6"><Form.Control name="first_name" placeholder="First Name" onChange={onChange} required /></div>
            <div className="col-md-6"><Form.Control name="last_name" placeholder="Last Name" onChange={onChange} required /></div>
            <div className="col-md-6"><Form.Control name="location" placeholder="Location" onChange={onChange} required /></div>
            <div className="col-md-6">
              <Form.Select name="gender" onChange={onChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </div>
            <div className="col-md-6"><Form.Control name="password" placeholder="Password" type="password" onChange={onChange} required minLength={8} /></div>
            <div className="col-md-6"><Form.Control name="confirm_password" placeholder="Confirm Password" type="password" onChange={onChange} required minLength={8} /></div>
          </div>
          <Button type="submit" className="mt-3 w-100">Register</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
