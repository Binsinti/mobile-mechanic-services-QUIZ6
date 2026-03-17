import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';

const Navigation = () => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);
  const user = userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
          Mobile Mechanic Service
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/subscription" className="text-dark">
              Subscriptions
            </Nav.Link>
            {isAuthenticated && (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} id="basic-nav-dropdown" className="text-dark">
                  {user?.first_name && user?.last_name 
                    ? `${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}` 
                    : user?.username?.toUpperCase() || 'ACCOUNT'}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/apply-seller">
                    Apply Seller
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/chatbot">
                    Chatbot
                  </Dropdown.Item>
                  {user?.role === 'Seller' && <Dropdown.Item as={Link} to="/seller-dashboard">Seller Dashboard</Dropdown.Item>}
                  {user?.role === 'Admin' && <Dropdown.Item as={Link} to="/users">Users</Dropdown.Item>}
                  {user?.role === 'Admin' && <Dropdown.Item as={Link} to="/subscription-list">Subscription List</Dropdown.Item>}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/signin" className="text-dark">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-dark">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
