import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listSubscriptionTransactions } from '../actions/subscriptionActions';

const SubscriptionList = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(listSubscriptionTransactions());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h3>Subscription Transactions</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>Tier</th>
            <th>Subscription Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.user}</td>
              <td>{t.tier?.name}</td>
              <td>{new Date(t.subscribed_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SubscriptionList;
