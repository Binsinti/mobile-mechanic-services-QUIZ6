import React, { useEffect } from 'react';
import { Container, Table, Badge, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/ordersSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { list: orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.service?.name}</td>
                <td>{new Date(order.scheduled_date).toLocaleDateString()}</td>
                <td>
                  <Badge bg={order.status === 'completed' ? 'success' : 'warning'}>
                    {order.status}
                  </Badge>
                </td>
                <td>
                  <Badge bg={order.payment_status === 'paid' ? 'success' : 'danger'}>
                    {order.payment_status}
                  </Badge>
                </td>
                <td>${order.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrdersPage;
