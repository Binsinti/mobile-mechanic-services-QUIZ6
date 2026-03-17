import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container, Modal, Form, Table, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, updateUser, deleteUser } from '../actions/userActions';
import { approveApplication, declineApplication, listApplications } from '../actions/applicationActions';

const UserScreen = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { applications } = useSelector((state) => state.applications);
  const [showDecline, setShowDecline] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState('');
  const [merchantId, setMerchantId] = useState('');

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listApplications());
  }, [dispatch]);

  const pending = useMemo(() => applications.filter((a) => a.status === 'pending'), [applications]);

  return (
    <Container className="py-4">
      <h3>Admin User Management</h3>
      <Tabs defaultActiveKey="users" className="mb-3">
        <Tab eventKey="users" title="All Users">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Button
                      size="sm"
                      className="me-2"
                      onClick={() => dispatch(updateUser({ id: u.id, first_name: u.first_name, last_name: u.last_name }))}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => dispatch(deleteUser(u.id))}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="applications" title="Seller Applications">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((a) => (
                <tr key={a.id}>
                  <td>{a.user_name || a.user_email}</td>
                  <td>{a.status}</td>
                  <td>{new Date(a.created_at).toLocaleString()}</td>
                  <td>
                    <Button size="sm" className="me-2" onClick={() => { setSelectedId(a.id); setShowApprove(true); }}>Approve</Button>
                    <Button size="sm" variant="warning" onClick={() => { setSelectedId(a.id); setShowDecline(true); }}>Decline</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showDecline} onHide={() => setShowDecline(false)}>
        <Modal.Header closeButton><Modal.Title>Decline Application</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Reason for declining"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDecline(false)}>Cancel</Button>
          <Button variant="warning" onClick={() => { dispatch(declineApplication(selectedId, reason)); setShowDecline(false); setReason(''); }}>Submit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showApprove} onHide={() => setShowApprove(false)}>
        <Modal.Header closeButton><Modal.Title>Approve Application</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Assign merchant ID"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApprove(false)}>Cancel</Button>
          <Button onClick={() => { dispatch(approveApplication(selectedId, merchantId)); setShowApprove(false); setMerchantId(''); }}>Approve</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserScreen;
