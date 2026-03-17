import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../store/slices/servicesSlice';

// Dummy services data with proper naming conventions
const DUMMY_SERVICES = [
  {
    id: 1,
    name: 'Battery Replacement',
    description: 'Car battery replacement with installation...',
    basePrice: 129.99,
    estimatedDuration: 30,
    rating: 4.6,
    reviewCount: 120,
    category: 'Maintenance',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%" y="50%" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3E🔋 Battery Replacement%3C/text%3E%3C/svg%3E'
  },
  {
    id: 2,
    name: 'Tire Rotation',
    description: 'Professional tire rotation and balancing service...',
    basePrice: 59.99,
    estimatedDuration: 45,
    rating: 4.7,
    reviewCount: 120,
    category: 'Maintenance',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%" y="50%" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3E🛞 Tire Rotation%3C/text%3E%3C/svg%3E'
  },
  {
    id: 3,
    name: 'Brake Inspection',
    description: 'Comprehensive brake system inspection and evaluation...',
    basePrice: 79.99,
    estimatedDuration: 90,
    rating: 4.9,
    reviewCount: 120,
    category: 'Inspection',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%" y="50%" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3E🛑 Brake Inspection%3C/text%3E%3C/svg%3E'
  },
  {
    id: 4,
    name: 'Oil Change Service',
    description: 'Professional oil change with premium synthetic oil...',
    basePrice: 49.99,
    estimatedDuration: 30,
    rating: 4.8,
    reviewCount: 120,
    category: 'Maintenance',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%" y="50%" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3E🛢️ Oil Change%3C/text%3E%3C/svg%3E'
  },
];

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: services, loading } = useSelector((state) => state.services);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [displayServices, setDisplayServices] = useState(DUMMY_SERVICES);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Use dummy data if no services loaded
  useEffect(() => {
    if (!loading && services && services.length > 0) {
      setDisplayServices(services);
    } else if (!loading) {
      setDisplayServices(DUMMY_SERVICES);
    }
  }, [services, loading]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <div className="bg-light py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Available Services</h1>
          <p className="text-muted fs-5">Browse and choose from our wide range of professional services</p>
        </div>
        <Row className="g-4">
          {displayServices.map((service) => (
            <Col md={6} lg={3} key={service.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0 service-card">
                <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{service.name}</h5>
                  <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {service.description}
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <span className="text-warning me-2">★</span>
                    <span className="fw-bold">{service.rating}</span>
                    <span className="text-muted ms-2">({service.reviewCount} reviews)</span>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-info text-dark me-2">${service.basePrice}</span>
                  </div>
                  <div className="d-flex align-items-center text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                    <span className="me-2">📍</span>
                    <span>Expert Service</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate(`/services/${service.id}`);
                    }}
                    className="w-100"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ServicesPage;
