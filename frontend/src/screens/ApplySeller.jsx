import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { submitSellerApplication } from '../actions/applicationActions';

const ApplySeller = () => {
  const [form] = useState({
    businessName: '',
    businessDescription: '',
    businessLicenseNumber: '',
  });
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.applications);

  return (
    <Container className="py-4" style={{ maxWidth: 760 }}>
      <Card className="p-4 profile-card">
        <h2 className="fw-bold mb-3">Apply as Seller</h2>
        <p className="text-muted mb-4">Fill out the form below to apply for seller status. Admin approval is required.</p>
        {success && <Alert variant="success">Application submitted successfully.</Alert>}
        {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control value={form.businessName} placeholder="Enter your business name" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Business Description</Form.Label>
            <Form.Control as="textarea" rows={4} value={form.businessDescription} placeholder="Describe your business and services" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Business License Number</Form.Label>
            <Form.Control value={form.businessLicenseNumber} placeholder="Enter your business license number" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload License Document</Form.Label>
            <Form.Control type="file" disabled />
            <Form.Text>Accepted formats: PDF, JPG, PNG (Max 5MB)</Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Upload Verification Document</Form.Label>
            <Form.Control type="file" disabled />
            <Form.Text>Accepted formats: PDF, JPG, PNG (Max 5MB)</Form.Text>
          </Form.Group>
        </Form>
        <Button className="w-100 py-2 fw-semibold" onClick={() => dispatch(submitSellerApplication())}>
          SUBMIT APPLICATION
        </Button>
      </Card>
    </Container>
  );
};

export default ApplySeller;
