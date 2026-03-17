# Mobile Mechanic Service

Full-stack application for booking mechanic services with AI chatbot support and subscription management.

## Project Structure

```
mobile-mechanic-service/
├── backend/              # Django REST API
│   ├── config/          # Django settings
│   ├── users/           # User management
│   ├── services/        # Mechanic services
│   ├── orders/          # Service orders
│   ├── chat/            # AI chatbot
│   ├── subscriptions/   # Subscription management
│   ├── applications/    # Mechanic applications
│   └── manage.py
├── frontend/            # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/       # Redux store & slices
│   │   ├── services/    # API services
│   │   └── styles/
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables (.env):
```
SECRET_KEY=your-secret-key
DEBUG=True
HUGGINGFACE_API_KEY=your-api-key
PAYPAL_CLIENT_ID=your-paypal-id
PAYPAL_SECRET=your-paypal-secret
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Seed the database:
```bash
python seed_db.py
```

7. Start the server:
```bash
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (.env):
```
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Features

- ✅ User authentication with JWT
- ✅ Service browsing and booking
- ✅ AI chatbot with subscription tiers
- ✅ Order management system
- ✅ Payment integration (PayPal ready)
- ✅ Responsive design with Bootstrap
- ✅ Redux state management
- ✅ Role-based access control

## Demo Credentials

**Admin Account:**
- Username: admin
- Password: admin123

**Customer Account:**
- Username: john
- Password: password123

## Technologies Used

### Backend
- Django 4.2
- Django REST Framework
- JWT Authentication
- PostgreSQL/SQLite
- Gunicorn

### Frontend
- React 18
- Redux Toolkit
- React Router
- Axios
- Bootstrap 5
- Formik & Yup

## API Endpoints

### Authentication
- `POST /api/token/` - Login
- `POST /api/token/refresh/` - Refresh token

### Users
- `GET/POST /api/v1/users/` - User management
- `GET /api/v1/users/me/` - Current user profile

### Services
- `GET /api/v1/services/` - List services
- `GET /api/v1/services/{id}/` - Service details

### Orders
- `GET/POST /api/v1/orders/` - Manage orders
- `POST /api/v1/orders/{id}/mark_completed/` - Complete order

### Chat
- `POST /api/v1/chat/ask/` - Send message to chatbot
- `GET /api/v1/chat/history/` - Chat history

### Subscriptions
- `GET /api/v1/subscriptions/tiers/` - Available tiers
- `GET /api/v1/subscriptions/user/current/` - Current subscription
- `POST /api/v1/subscriptions/user/subscribe/` - Subscribe to tier

## Future Enhancements

- Real-time notifications
- Advanced search and filtering
- Mechanic ratings and reviews
- Video call support
- Mobile app (React Native)
- Analytics dashboard
- Automated testing

## License

MIT License - feel free to use this project for learning and development.
