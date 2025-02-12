# Rotten Potatoes 📚

Welcome to Rotten Potatoes, a comprehensive platform for book enthusiasts to discover, read, and share their favorite books. This project includes both frontend and backend components to create a full-featured book review and discussion platform.

## Quick Links
- 🚀 [Live Demo](https://vercel-deploy-one-gamma.vercel.app/)

## Team Members
- [Abdelhake Hamdoaui](https://github.com/HamdaouiAbdelhake) 
- [Racha Badreddine](https://github.com/racha-badreddine) 
- [Melike Besparmak](https://github.com/metahead00)
- [Madina Alzhanova](https://github.com/madinansar) 

## Special Thanks
We would like to extend our heartfelt gratitude to:
- Our instructors at ITU for their guidance and support

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Rotten Potatoes is a platform where bookworms unite to devour literature like a hungry caterpillar at an all-you-can-eat buffet! Whether you're here to find your next page-turner, share your unsolicited opinions, or just procrastinate on that novel you're supposed to be writing, we've got you covered.

## Features

### User Management
- User registration and authentication using JWT
- Secure password hashing and storage
- Profile customization and management

### Book Features
- Comprehensive book database with detailed information
- Advanced search functionality with multiple filters
- Book categorization by genre, author, and tags
- Rating and review system
- Personalized reading lists

### Community Features
- Interactive comment system on reviews
- Community driven review page

## Technology Stack

### Frontend
- React.js for UI components
- React Router for navigation
- Bootstrap for responsive design
- Axios for API communication
- Postman for testing

### Backend
- Flask framework
- JWT for authentication
- PostgreSQL database
- Flask-RESTful for API endpoints

### Deployment
- Heroku for backend deployment
- Vercel Pages for frontend deployment
- PostgreSQL hosting on Heroku

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python (v3.8 or higher)
- pip (latest version)
- PostgreSQL (v12 or higher)

### Clone the Repository
```bash
git clone https://github.com/your-username/rotten-potatoes.git
cd rotten-potatoes
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start development server
python run.py
```

## Environment Setup

### Frontend Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend Environment Variables
Create a `.env` file in the backend directory:
```env
SECRET_KEY="your-secret-key"
JWT_SECRET_KEY="your-JWT-secret-key"
DB_NAME="your-db-name"
DB_USER="your-db-user"
DB_PASSWORD="your-db-password"
DB_HOST="your-db-host"
DB_PORT="your-db-port"
JWT_ACCESS_TOKEN_EXPIRES="3600"
```

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

Before submitting your pull request, please:
- Run all tests
- Update documentation as needed
- Follow the existing code style
- Add unit tests for any new functionality

## License
This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 Rotten Potatoes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
