import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ApplySeller from './screens/ApplySeller';
import UserScreen from './screens/UserScreen';
import SellerDashboard from './screens/SellerDashboard';
import UserProfile from './screens/UserProfile';
import SubscriptionScreen from './screens/SubscriptionScreen';
import SubscriptionList from './screens/SubscriptionList';
import ChatbotScreen from './screens/ChatbotScreen';

import { fetchProfile } from './actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/services/:id" element={<DetailScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/apply-seller"
          element={
            <ProtectedRoute>
              <ApplySeller />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={['Admin']}>
              <UserScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute roles={['Seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription-list"
          element={
            <ProtectedRoute roles={['Admin']}>
              <SubscriptionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatbotScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
