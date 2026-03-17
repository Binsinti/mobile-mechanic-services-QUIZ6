import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSellerService, deleteSellerService, listSellerServices } from '../actions/serviceActions';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { sellerServices } = useSelector((state) => state.services);
  const [form, setForm] = useState({
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
    sample_image: null,
  });

  useEffect(() => {
    dispatch(listSellerServices());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSellerService(form));
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={5}>
          <Card className="p-3">
            <h4>Add New Service</h4>
            <Form onSubmit={submitHandler}>
              <Form.Control className="mb-2" placeholder="Service Name" onChange={(e) => setForm({ ...form, service_name: e.target.value })} required />
              <Form.Control className="mb-2" as="textarea" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <Form.Control className="mb-2" type="number" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <Form.Control className="mb-2" type="number" placeholder="Duration (minutes)" onChange={(e) => setForm({ ...form, duration_of_service: e.target.value })} required />
              <Form.Control className="mb-2" type="file" onChange={(e) => setForm({ ...form, sample_image: e.target.files[0] })} />
              <Button type="submit" className="w-100">Add Service</Button>
            </Form>
          </Card>
        </Col>
        <Col md={7}>
          <h4>Manage Existing Services</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerServices.map((s) => (
                <tr key={s.id}>
                  <td>{s.service_name}</td>
                  <td>${s.price}</td>
                  <td>{s.duration_of_service} mins</td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => dispatch(deleteSellerService(s.id))}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SellerDashboard;
