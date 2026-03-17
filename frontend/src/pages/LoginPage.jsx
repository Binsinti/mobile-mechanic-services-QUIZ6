import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (result.payload?.access) {
      navigate('/dashboard');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error.detail || 'Login failed'}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;
