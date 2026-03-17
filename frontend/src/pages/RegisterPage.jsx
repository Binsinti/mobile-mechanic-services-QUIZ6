import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    role: 'customer',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert('Passwords do not match');
      return;
    }
    const result = await dispatch(registerUser(formData));
    if (result.payload?.id) {
      alert('Registration successful. Please login.');
      navigate('/login');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card style={{ width: '500px' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            {error && <Alert variant="danger">{error.detail || 'Registration failed'}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Account Type</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  <option value="customer">Customer</option>
                  <option value="mechanic">Mechanic</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterPage;
