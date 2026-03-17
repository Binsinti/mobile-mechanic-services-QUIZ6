import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Dummy subscription tiers
const SUBSCRIPTION_TIERS = [
  {
    id: 1,
    name: 'Basic',
    price: 9.99,
    subtitle: 'Perfect for occasional users',
    description: 'For occasional users',
    features: [
      'Up to 3 chatbot messages per month',
      'Priority support',
      'Basic dashboard',
      'Service history'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Pro',
    price: 19.99,
    subtitle: 'For regular users',
    description: 'For regular users',
    features: [
      'Up to 5 chatbot messages per month',
      '24/7 Priority support',
      'Advanced dashboard',
      'Full service history',
      'Booking calendar',
      'Service recommendations'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Premium',
    price: 49.99,
    subtitle: 'For power users',
    description: 'For power users',
    features: [
      'Up to 10 chatbot messages per month',
      'Dedicated account manager',
      'Custom service packages',
      'Advanced analytics',
      'API access',
      'Custom integrations'
    ],
    popular: false
  }
];

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const [loadingTierId, setLoadingTierId] = useState(null);

  const handleSubscribe = (tierId) => {
    setLoadingTierId(tierId);
    // Simulate loading
    setTimeout(() => {
      setLoadingTierId(null);
      // Handle subscription logic here
    }, 2000);
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Choose Your Plan</h1>
          <p className="text-muted fs-5">Subscribe to unlock unlimited access to our services</p>
        </div>

        <Row className="g-4 mb-5">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <Col md={6} lg={4} key={tier.id}>
              <Card
                className={`h-100 border-0 shadow-sm ${
                  tier.popular ? 'border-primary' : ''
                }`}
                style={tier.popular ? { borderWidth: '3px !important' } : {}}
              >
                {tier.popular && (
                  <div className="bg-primary text-white text-center py-2 fw-bold small">
                    Most Popular
                  </div>
                )}
                <Card.Body className="d-flex flex-column">
                  <h5 className="card-title fw-bold mb-1">{tier.name}</h5>
                  <p className="text-muted small mb-3">{tier.subtitle}</p>

                  <div className="mb-4">
                    <span className="display-6 fw-bold text-primary">${tier.price}</span>
                    <span className="text-muted small">/month</span>
                  </div>

                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="mb-2 d-flex">
                        <span className="text-success me-2">✓</span>
                        <span className="text-muted small">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? 'primary' : 'outline-primary'}
                    className="w-100 fw-bold"
                    onClick={() => handleSubscribe(tier.id)}
                    disabled={loadingTierId !== null}
                  >
                    {loadingTierId === tier.id ? (
                      <>
                        ⏳ LOADING...
                      </>
                    ) : (
                      'SUBSCRIBE'
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Not Ready Section */}
        <div className="bg-white rounded shadow-sm p-5 text-center">
          <h5 className="fw-bold mb-2">Not ready to commit?</h5>
          <p className="text-muted mb-4">All subscriptions can be cancelled anytime</p>
          <Button
            variant="outline-info"
            className="fw-bold"
            onClick={() => navigate('/services')}
          >
            BROWSE FREE SERVICES
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SubscriptionsPage;
