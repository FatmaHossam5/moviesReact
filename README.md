# 🎬 Movies React App

A modern, responsive web application for discovering and exploring movies and TV shows. Built with React and styled with beautiful, accessible components.

## ✨ Features

- **🎭 Movie Discovery**: Browse trending movies with detailed information
- **📺 TV Shows**: Explore popular TV series and their details
- **🔐 User Authentication**: Secure login and registration system
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **♿ Accessible**: Built with accessibility in mind for all users
- **🎨 Modern UI**: Beautiful, animated interface with smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd moviesReact
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## 🎯 How to Use

### For New Users
1. **Register**: Create a new account with your email and password
2. **Login**: Sign in to access all features
3. **Explore**: Browse trending movies and TV shows
4. **Discover**: Click on any movie or show to see detailed information

### For Existing Users
1. **Sign In**: Use your existing credentials
2. **Browse**: Check out the latest trending content
3. **Navigate**: Use the navbar to switch between movies and TV shows

## 🛠️ Tech Stack

- **Frontend**: React 18 with modern hooks
- **Routing**: React Router for seamless navigation
- **Styling**: Custom CSS with responsive design
- **API**: The Movie Database (TMDB) for movie/TV data
- **Authentication**: JWT-based user authentication
- **Validation**: Joi for form validation
- **HTTP Client**: Axios for API requests

## 📁 Project Structure

```
src/
├── Component/
│   ├── Home/           # Landing page with trending content
│   ├── Movies/         # Movies listing and details
│   ├── TvShows/        # TV shows listing and details
│   ├── TvDetails/      # Individual TV show details
│   ├── MovieDetails/   # Individual movie details
│   ├── Login/          # User authentication
│   ├── Register/       # User registration
│   └── Navbar/         # Navigation component
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎨 Key Components

### Home Page
- Displays trending movies and TV shows
- Responsive grid layout
- Smooth animations and hover effects

### Movies & TV Shows
- Modern card-based design
- Loading states and error handling
- Accessible navigation and interactions

### User Authentication
- Secure login and registration
- Form validation with helpful error messages
- Password visibility toggle

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🌟 Features in Detail

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly

### Performance
- Lazy loading for images
- Optimized API calls
- Smooth animations
- Fast page transitions

## 🚨 Important Notes

### API Status
⚠️ **Note**: The authentication API endpoints (`https://route-movies-api.vercel.app`) are currently returning 404 errors. This means:
- Registration and login features may not work
- The Vercel deployment might be inactive or the URL has changed
- You may need to update the API endpoints in the code

### Movie/TV Data
✅ **Working**: The movie and TV show data from TMDB API is working perfectly and displays:
- Trending movies and TV shows
- Detailed information for each title
- High-quality posters and images
- Ratings and release dates

