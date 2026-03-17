import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { getServiceDetail } from '../actions/serviceActions';
import { createOrder } from '../actions/orderActions';

const DetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { serviceDetail } = useSelector((state) => state.services);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getServiceDetail(id));
  }, [dispatch, id]);

  if (!serviceDetail) {
    return <Container className="py-4">Loading...</Container>;
  }

  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';

  return (
    <Container className="py-4 profile-shell">
      <div className="mb-4">
        <Link to="/" className="text-decoration-none fw-semibold">&larr; BACK TO SERVICES</Link>
      </div>
      <Row>
        <Col md={7}>
          <Card className="p-0 overflow-hidden service-preview-card">
            {serviceDetail.sample_image ? (
              <Card.Img variant="top" src={serviceDetail.sample_image} className="service-preview-image" />
            ) : (
              <div className="service-preview-image d-flex align-items-center justify-content-center text-muted bg-light">
                {serviceDetail.service_name}
              </div>
            )}
          </Card>
        </Col>
        <Col md={5}>
          <h1 className="fw-bold mb-3">{serviceDetail.service_name}</h1>
          <p className="mb-4 text-muted">{serviceDetail.description}</p>
          <Row className="mb-3">
            <Col xs={6}>
              <div className="text-muted fw-semibold small">PRICE:</div>
              <div className="text-primary fw-bold fs-4">${serviceDetail.price}</div>
            </Col>
            <Col xs={6}>
              <div className="text-muted fw-semibold small">DURATION:</div>
              <div className="fw-bold">{serviceDetail.duration_of_service} minutes</div>
            </Col>
          </Row>
          <div className="mb-3">
            <div className="text-muted fw-semibold small">EXPERT:</div>
            <div className="fw-semibold">{serviceDetail.name_of_the_expert}</div>
          </div>
          <Card className="p-3 mb-3 bg-light border-0">
            <h6 className="fw-bold mb-2">Service Highlights</h6>
            <ul className="mb-0">
              <li>Professional and certified experts</li>
              <li>Guaranteed quality service</li>
              <li>Secure payment with PayPal</li>
              <li>Money-back guarantee</li>
            </ul>
          </Card>

          {userInfo ? (
            paypalClientId ? (
              <PayPalScriptProvider options={{ 'client-id': paypalClientId }}>
                <PayPalButtons
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [
                        {
                          description: serviceDetail.service_name,
                          amount: { value: serviceDetail.price },
                          payee: userInfo.role === 'User' ? undefined : undefined,
                        },
                      ],
                    })
                  }
                  onApprove={async (data, actions) => {
                    await actions.order.capture();
                    dispatch(
                      createOrder({
                        service_id: serviceDetail.id,
                        paypal_transaction_id: data.orderID,
                        price_paid: serviceDetail.price,
                      })
                    );
                    alert('Service purchased successfully.');
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <Button
                className="w-100 py-2 fw-bold"
                onClick={() =>
                  dispatch(
                    createOrder({
                      service_id: serviceDetail.id,
                      paypal_transaction_id: `offline-${Date.now()}`,
                      price_paid: serviceDetail.price,
                    })
                  )
                }
              >
                BOOK SERVICE - ${serviceDetail.price}
              </Button>
            )
          ) : (
            <Card className="p-3">
              <p className="mb-2">Please sign in to book this service.</p>
              <Button as={Link} to="/signin" className="w-100">Sign In</Button>
            </Card>
          )}
          <Button as={Link} to="/" variant="light" className="w-100 mt-3 py-2 fw-semibold border">
            BROWSE MORE SERVICES
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailScreen;
