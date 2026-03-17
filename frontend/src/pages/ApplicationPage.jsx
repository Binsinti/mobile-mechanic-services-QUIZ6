import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    licenseNumber: '',
    licenseDocument: null,
    verificationDocument: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [licenseFilename, setLicenseFilename] = useState('No file chosen');
  const [verificationFilename, setVerificationFilename] = useState('No file chosen');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      if (fileType === 'license') {
        setFormData((prev) => ({ ...prev, licenseDocument: file }));
        setLicenseFilename(file.name);
      } else {
        setFormData((prev) => ({ ...prev, verificationDocument: file }));
        setVerificationFilename(file.name);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage({ type: 'success', text: 'Application submitted successfully! Admin approval is required.' });
        setFormData({
          businessName: '',
          businessDescription: '',
          licenseNumber: '',
          licenseDocument: null,
          verificationDocument: null,
        });
        setLicenseFilename('No file chosen');
        setVerificationFilename('No file chosen');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to submit application.' });
      setLoading(false);
    }
  };

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="bg-white rounded shadow-sm p-5">
              <h1 className="text-center fw-bold mb-2">Apply as Seller</h1>
              <p className="text-center text-muted mb-4">
                Fill out the form below to apply for seller status. Admin approval is required.
              </p>

              {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Business Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="border-light"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Business Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="businessDescription"
                    placeholder="Describe your business and services"
                    rows={4}
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                    className="border-light"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Business License Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="licenseNumber"
                    placeholder="Enter your business license number"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    className="border-light"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Upload License Document</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'license')}
                    className="border-light"
                  />
                  <Form.Text className="d-block mt-2 text-muted">
                    Selected: <span className="text-secondary">{licenseFilename}</span>
                  </Form.Text>
                  <Form.Text className="d-block text-muted small">
                    Accepted formats: PDF, JPG, PNG (Max 5MB)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Upload Verification Document</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'verification')}
                    className="border-light"
                  />
                  <Form.Text className="d-block mt-2 text-muted">
                    Selected: <span className="text-secondary">{verificationFilename}</span>
                  </Form.Text>
                  <Form.Text className="d-block text-muted small">
                    Accepted formats: PDF, JPG, PNG (Max 5MB)
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplicationPage;
