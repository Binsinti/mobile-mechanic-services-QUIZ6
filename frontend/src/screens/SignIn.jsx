import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../actions/authActions';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login(email, password));
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <Container className="py-5" style={{ maxWidth: 520 }}>
      <Card className="p-4">
        <h3 className="mb-3">Sign In</h3>
        {error && <Alert variant="danger">{String(error)}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
