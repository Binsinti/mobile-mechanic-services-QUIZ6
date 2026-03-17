import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, fetchChatHistory } from '../store/slices/chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, loading, usageLeft, maxUsage, error } = useSelector((state) => state.chat);
  const { currentSubscription } = useSelector((state) => state.subscription);
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await dispatch(sendMessage(input));
      setInput('');
    }
  };

  if (!currentSubscription) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          You need an active subscription to use the chatbot. 
          <a href="/subscriptions"> Subscribe now</a>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">AI Chatbot</h1>

      {currentSubscription && (
        <Alert variant="info">
          Messages Remaining: {usageLeft}/{maxUsage}
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <div
        style={{
          height: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.length === 0 ? (
          <p className="text-muted">No messages yet. Start a conversation!</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                msg.message_type === 'user' ? 'bg-primary text-white' : 'bg-light'
              }`}
            >
              <small className="d-block text-muted">
                {msg.message_type === 'user' ? 'You' : 'Bot'}
              </small>
              {msg.message}
            </div>
          ))
        )}
        {loading && <Spinner animation="border" size="sm" />}
      </div>

      <Form onSubmit={handleSend}>
        <Form.Group className="d-flex gap-2">
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={loading || usageLeft === 0}
          />
          <Button variant="primary" type="submit" disabled={loading || usageLeft === 0}>
            Send
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ChatPage;
