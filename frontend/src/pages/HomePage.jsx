import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-center text-md-start">
          <h1 className="display-4 fw-bold mb-4">Mobile Mechanic Service</h1>
          <p className="lead mb-4">
            Get professional mechanic services at your doorstep. Book, chat, and manage your service orders all in one place.
          </p>
          <Link to="/services">
            <Button size="lg" className="btn-primary me-3">
              Browse Services
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline-primary">
              Get Started
            </Button>
          </Link>
        </Col>
        <Col md={6} className="text-center">
          <div style={{ fontSize: '100px' }}>🚗</div>
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={4} className="text-center mb-3">
          <h3>🛠️ Expert Services</h3>
          <p>Professional mechanics providing top-quality automotive services.</p>
        </Col>
        <Col md={4} className="text-center mb-3">
          <h3>💬 AI Chat Support</h3>
          <p>Get instant answers to your automotive questions with our AI chatbot.</p>
        </Col>
        <Col md={4} className="text-center mb-3">
          <h3>📅 Easy Booking</h3>
          <p>Simple and flexible scheduling for your convenience.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
