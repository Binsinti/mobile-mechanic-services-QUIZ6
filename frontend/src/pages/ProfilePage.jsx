import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

// Dummy orders data
const DUMMY_ORDERS = [
  {
    id: 11,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'pending',
    date: 'March 17, 2026'
  },
  {
    id: 10,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'pending',
    date: 'March 17, 2026'
  },
  {
    id: 9,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'pending',
    date: 'March 17, 2026'
  },
  {
    id: 8,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'pending',
    date: 'March 17, 2026'
  },
  {
    id: 7,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 6,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 5,
    service: 'Oil Change Service',
    price: 49.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 4,
    service: 'Oil Change Service',
    price: 49.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 3,
    service: 'Tire Rotation',
    price: 59.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 2,
    service: 'Tire Rotation',
    price: 59.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
  {
    id: 1,
    service: 'Brake Inspection',
    price: 79.99,
    status: 'completed',
    date: 'March 17, 2026'
  },
];

const ProfilePage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('Failed to fetch orders');
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'warning',
      'completed': 'success',
      'cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
  };

  const displayUser = user || {
    firstName: 'VINCE',
    lastName: 'YUAN',
    email: 'vinceyuan58@gmail.com',
    phone: '09171412854',
    location: 'Angeles City, Pampanga',
    accountType: 'User'
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">My Profile</h2>
          <Button variant="danger" size="sm" onClick={handleLogout}>
            LOGOUT
          </Button>
        </div>

        <Row className="mb-4">
          <Col lg={4} className="mb-4">
            <div className="bg-white rounded shadow-sm p-4 text-center">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#007bff',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '48px',
                }}
              >
                👤
              </div>
              <h5 className="fw-bold text-uppercase">
                {displayUser.firstName} {displayUser.lastName}
              </h5>
              <p className="text-muted mb-1">{displayUser.email}</p>
              <p className="text-muted small">{displayUser.location}</p>
            </div>
          </Col>

          <Col lg={8}>
            <div className="bg-white rounded shadow-sm p-4">
              <h5 className="fw-bold mb-4">Profile Information</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">First Name</p>
                  <p className="fw-bold">{displayUser.firstName}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">Last Name</p>
                  <p className="fw-bold">{displayUser.lastName}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">Email</p>
                  <p className="fw-bold">{displayUser.email}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">Phone</p>
                  <p className="fw-bold">{displayUser.phone}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">Location</p>
                  <p className="fw-bold">{displayUser.location}</p>
                </Col>
                <Col md={6} className="mb-3">
                  <p className="text-uppercase text-muted small fw-bold">Account Type</p>
                  <p className="fw-bold">{displayUser.accountType}</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {showError && (
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
            className="mb-4"
          >
            {errorMessage}
          </Alert>
        )}

        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="fw-bold mb-4">Order History</h5>
          <div style={{ overflowX: 'auto' }}>
            <Table hover responsive>
              <thead className="table-light">
                <tr>
                  <th className="fw-bold text-uppercase small">Order ID</th>
                  <th className="fw-bold text-uppercase small">Service</th>
                  <th className="fw-bold text-uppercase small">Price</th>
                  <th className="fw-bold text-uppercase small">Status</th>
                  <th className="fw-bold text-uppercase small">Date</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_ORDERS.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-bold">#{order.id}</td>
                    <td>{order.service}</td>
                    <td>${order.price}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(order.status)} text-uppercase small`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
