import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServiceDetail } from '../store/slices/servicesSlice';
import { createOrder } from '../store/slices/ordersSlice';

const BookingPage = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedService } = useSelector((state) => state.services);
  const { loading } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    scheduled_date: '',
    address: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    dispatch(fetchServiceDetail(serviceId));
  }, [dispatch, serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      createOrder({
        service_id: serviceId,
        ...formData,
      })
    );
    if (result.payload?.id) {
      alert('Order created successfully!');
      navigate('/orders');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Book {selectedService?.name}</h1>
      <div style={{ maxWidth: '500px' }} className="mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Service: {selectedService?.name}</Form.Label>
            <p className="text-muted">Price: ${selectedService?.base_price}</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Scheduled Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="scheduled_date"
              value={formData.scheduled_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? 'Creating Order...' : 'Confirm Booking'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default BookingPage;
