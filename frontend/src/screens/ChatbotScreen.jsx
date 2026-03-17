import React, { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { askChatbot } from '../actions/chatActions';

const ChatbotScreen = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages, usage, error } = useSelector((state) => state.chat);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(askChatbot(message));
    setMessage('');
  };

  return (
    <Container className="py-4" style={{ maxWidth: 760 }}>
      <Card className="p-3">
        <h4>Project Assistant Chatbot</h4>
        <p className="text-muted mb-2">Answers are limited to this services marketplace project.</p>
        {usage && <Alert variant="info">Usage left: {usage.left}/{usage.max}</Alert>}
        {error && <Alert variant="danger">{String(error)}</Alert>}
        <div style={{ minHeight: 280 }}>
          {messages.map((m) => (
            <div key={m.id || Math.random()} className="mb-2">
              <strong>{m.message_type === 'user' ? 'You' : 'Bot'}:</strong> {m.message}
            </div>
          ))}
        </div>
        <Form onSubmit={submitHandler} className="d-flex gap-2 mt-3">
          <Form.Control value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about services, subscriptions, orders..." />
          <Button type="submit">Send</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ChatbotScreen;
