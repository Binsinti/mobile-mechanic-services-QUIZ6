import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Dummy services data
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
    expertName: 'Professional Expert',
    highlights: [
      'Professional and certified experts',
      'Guaranteed quality service',
      'Secure payment with PayPal',
      'Money-back guarantee'
    ],
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
    expertName: 'Professional Expert',
    highlights: [
      'Professional and certified experts',
      'Guaranteed quality service',
      'Secure payment with PayPal',
      'Money-back guarantee'
    ],
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
    expertName: 'Professional Expert',
    highlights: [
      'Professional and certified experts',
      'Guaranteed quality service',
      'Secure payment with PayPal',
      'Money-back guarantee'
    ],
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
    expertName: 'Professional Expert',
    highlights: [
      'Professional and certified experts',
      'Guaranteed quality service',
      'Secure payment with PayPal',
      'Money-back guarantee'
    ],
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext x="50%" y="50%" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3E🛢️ Oil Change%3C/text%3E%3C/svg%3E'
  },
];

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const foundService = DUMMY_SERVICES.find(s => s.id === parseInt(serviceId));
    if (foundService) {
      setService(foundService);
    }
    setLoading(false);
  }, [serviceId]);

  if (loading) {
    return <Container className="py-5 text-center">Loading...</Container>;
  }

  if (!service) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Service not found</Alert>
        <Button onClick={() => navigate('/services')}>Back to Services</Button>
      </Container>
    );
  }

  const handleBookService = () => {
    if (isAuthenticated) {
      navigate(`/booking/${service.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <Button
          variant="link"
          className="text-primary mb-4 p-0"
          onClick={() => navigate('/services')}
          style={{ textDecoration: 'none' }}
        >
          ← BACK TO SERVICES
        </Button>

        <Row className="bg-white rounded shadow-sm p-5">
          <Col lg={5} className="mb-4 mb-lg-0">
            <div className="position-relative overflow-hidden rounded" style={{ height: '400px', backgroundColor: '#f0f0f0' }}>
              <img
                src={service.image}
                alt={service.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Col>

          <Col lg={7} className="ps-lg-5">
            <div className="d-flex align-items-center mb-3">
              <span className="text-warning me-2 fs-5">★</span>
              <span className="fw-bold fs-5">{service.rating}</span>
              <span className="text-muted ms-2">({service.reviewCount} reviews)</span>
            </div>

            <h1 className="fw-bold mb-4">{service.name}</h1>

            <p className="text-muted mb-4">{service.description}</p>

            <div className="row mb-4">
              <div className="col-6">
                <div className="mb-3">
                  <span className="text-uppercase text-muted small fw-bold">PRICE:</span>
                  <h3 className="text-info fw-bold">${service.basePrice}</h3>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <span className="text-uppercase text-muted small fw-bold">DURATION:</span>
                  <h3 className="fw-bold">{service.estimatedDuration / 60} hours</h3>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-uppercase text-muted small fw-bold">EXPERT:</span>
              <div className="d-flex align-items-center mt-2">
                <span className="me-2">👤</span>
                <span className="fs-5">{service.expertName}</span>
              </div>
            </div>

            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="card-title fw-bold mb-3">Service Highlights</h5>
                <ul className="list-unstyled">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="me-2">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <div className="d-grid gap-3">
              <Button
                variant="info"
                size="lg"
                className="fw-bold text-white"
                onClick={handleBookService}
              >
                BOOK SERVICE - ${service.basePrice}
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                className="fw-bold"
                onClick={() => navigate('/services')}
              >
                BROWSE MORE SERVICES
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceDetailPage;
