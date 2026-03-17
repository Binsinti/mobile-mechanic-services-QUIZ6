import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { listServices } from '../actions/serviceActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const serviceList = Array.isArray(services) ? services : [];

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);

  return (
    <Container className="py-4 profile-shell">
      <h2 className="section-title mb-4">Available Services</h2>
      {error && <Alert variant="danger">{typeof error === 'string' ? error : JSON.stringify(error)}</Alert>}
      {loading && (
        <div className="py-5 text-center">
          <Spinner animation="border" />
        </div>
      )}
      {!loading && serviceList.length === 0 && (
        <Alert variant="secondary">No services found. Please check if backend is running and seeded.</Alert>
      )}
      <Row>
        {serviceList.map((service) => (
          <Col key={service.id} lg={4} md={6} className="mb-4">
            <Card as={Link} to={`/services/${service.id}`} className="h-100 text-decoration-none text-dark service-list-card">
              {service.sample_image ? (
                <Card.Img variant="top" src={service.sample_image} className="service-image" />
              ) : (
                <div className="service-image d-flex align-items-center justify-content-center text-muted bg-light">
                  No Image
                </div>
              )}
              <Card.Body>
                <Card.Title className="fw-bold">{service.service_name}</Card.Title>
                <Card.Text className="text-muted small mb-2">{service.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-primary">${service.price}</span>
                  <span className="small">Rating: {service.rating}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
