import React, { useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../actions/authActions';
import { logout } from '../actions/authActions';
import { listMyOrders } from '../actions/orderActions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders, error } = useSelector((state) => state.orders);
  const orderList = Array.isArray(orders) ? orders : [];

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(listMyOrders());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Container className="py-4 profile-shell">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title mb-0">My Profile</h2>
        <Button variant="danger" size="sm" onClick={handleLogout} className="fw-semibold px-3">LOGOUT</Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-4 text-center profile-card h-100">
            <div className="avatar-circle mx-auto mb-3">👤</div>
            <h5 className="fw-bold mb-1">{userInfo?.first_name} {userInfo?.last_name}</h5>
            <div className="text-muted small">{userInfo?.email}</div>
            <div className="text-muted small">{userInfo?.location}</div>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4 profile-card h-100">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Profile Information</h6>
            <Row>
              <Col sm={6} className="mb-3"><div className="text-muted small">FIRST NAME</div><div className="fw-semibold">{userInfo?.first_name}</div></Col>
              <Col sm={6} className="mb-3"><div className="text-muted small">LAST NAME</div><div className="fw-semibold">{userInfo?.last_name}</div></Col>
              <Col sm={6} className="mb-3"><div className="text-muted small">EMAIL</div><div className="fw-semibold">{userInfo?.email}</div></Col>
              <Col sm={6} className="mb-3"><div className="text-muted small">PHONE</div><div className="fw-semibold">{userInfo?.phone_number || '-'}</div></Col>
              <Col sm={6}><div className="text-muted small">LOCATION</div><div className="fw-semibold">{userInfo?.location || '-'}</div></Col>
              <Col sm={6}><div className="text-muted small">ACCOUNT TYPE</div><div className="fw-semibold">{userInfo?.role}</div></Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {error && <div className="alert alert-danger py-2">Failed to fetch orders</div>}

      <h4 className="mb-3">Order History</h4>
      <Table striped bordered hover responsive className="bg-white">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Service</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.service?.service_name}</td>
              <td>${o.price_paid}</td>
              <td>
                <Badge bg={(o.status || 'completed') === 'pending' ? 'warning' : 'success'}>
                  {(o.status || 'completed').toLowerCase()}
                </Badge>
              </td>
              <td>{formatDate(o.date_purchased)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserProfile;
