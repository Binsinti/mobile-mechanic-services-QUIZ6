import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { listSubscriptionTiers, createSubscription } from '../actions/subscriptionActions';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const { tiers, creating, error, successMessage } = useSelector((state) => state.subscriptions);
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [paypalError, setPaypalError] = useState('');

  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';

  const planIdByUsage = useMemo(
    () => ({
      3: process.env.REACT_APP_PAYPAL_PLAN_ID_TIER1 || '',
      5: process.env.REACT_APP_PAYPAL_PLAN_ID_TIER2 || '',
      10: process.env.REACT_APP_PAYPAL_PLAN_ID_TIER3 || '',
    }),
    []
  );

  const tierList = Array.isArray(tiers) ? tiers : [];
  const uniqueTierList = tierList
    .reduce((acc, tier) => {
      const key = String(tier.max_usage);
      if (!acc.some((item) => String(item.max_usage) === key)) {
        acc.push(tier);
      }
      return acc;
    }, [])
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, 3);

  const selectedPlanId = selectedTier ? planIdByUsage[selectedTier.max_usage] : '';

  useEffect(() => {
    dispatch(listSubscriptionTiers());
  }, [dispatch]);

  const openPayPalModal = (tier) => {
    setPaypalError('');
    setSelectedTier(tier);
    setShowPayPalModal(true);
  };

  return (
    <Container className="py-4 profile-shell">
      <h3 className="mb-4">Subscription Tiers</h3>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{typeof error === 'string' ? error : JSON.stringify(error)}</Alert>}
      <Row>
        {uniqueTierList.map((tier) => (
          <Col key={tier.id} md={4} className="mb-3">
            <Card className="h-100 p-3 profile-card">
              <h4 className="mb-1">{tier.name}</h4>
              <h5 className="mb-1">${tier.price}</h5>
              <p className="small mb-3">Chat Usage: {tier.max_usage}</p>
              <Button disabled={creating} onClick={() => openPayPalModal(tier)}>
                {creating ? <><Spinner size="sm" className="me-2" />Processing...</> : 'Subscribe with PayPal'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showPayPalModal} onHide={() => setShowPayPalModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay with PayPal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            Selected Tier: <strong>{selectedTier?.name || '-'}</strong>
          </p>
          <p className="text-muted small">Complete payment in PayPal to activate your subscription.</p>

          {!paypalClientId && (
            <Alert variant="danger" className="mb-0">
              Missing REACT_APP_PAYPAL_CLIENT_ID in frontend environment.
            </Alert>
          )}

          {paypalClientId && !selectedPlanId && (
            <Alert variant="danger" className="mb-0">
              Missing PayPal Plan ID for this tier. Configure REACT_APP_PAYPAL_PLAN_ID_TIER1, REACT_APP_PAYPAL_PLAN_ID_TIER2, and REACT_APP_PAYPAL_PLAN_ID_TIER3.
            </Alert>
          )}

          {paypalError && <Alert variant="danger" className="mb-0">{paypalError}</Alert>}

          {paypalClientId && selectedPlanId && (
            <PayPalScriptProvider options={{ 'client-id': paypalClientId, intent: 'subscription', vault: true }}>
              <PayPalButtons
                style={{ layout: 'vertical', shape: 'rect', label: 'subscribe' }}
                createSubscription={(data, actions) =>
                  actions.subscription.create({
                    plan_id: selectedPlanId,
                  })
                }
                onApprove={async () => {
                  if (selectedTier) {
                    await dispatch(createSubscription(selectedTier.id));
                  }
                  setShowPayPalModal(false);
                }}
                onError={() => {
                  setPaypalError('PayPal checkout failed. Please try again.');
                }}
              />
            </PayPalScriptProvider>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SubscriptionScreen;
