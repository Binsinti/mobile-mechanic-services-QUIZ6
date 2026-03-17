import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { list: orders } = useSelector((state) => state.orders);
  const { currentSubscription } = useSelector((state) => state.subscription);

  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h3>{orders.length}</h3>
              <p className="text-muted">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h3>{pendingOrders}</h3>
              <p className="text-muted">Pending Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <h3>{completedOrders}</h3>
              <p className="text-muted">Completed Orders</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {currentSubscription && (
        <Card>
          <Card.Body>
            <h5>Subscription Status</h5>
            <p>
              <strong>Plan:</strong> {currentSubscription.tier.name}
            </p>
            <p>
              <strong>Messages Remaining:</strong> {currentSubscription.usage_left}/
              {currentSubscription.tier.max_usage}
            </p>
            <p>
              <strong>Renews:</strong> {new Date(currentSubscription.renews_at).toLocaleDateString()}
            </p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DashboardPage;
