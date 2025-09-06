import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({crruser, clrUser}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent custom-navbar">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand brand-logo" to=''>
          <span className="brand-text">Noxe</span>
        </Link>
        
        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler custom-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Main Navigation - Only show when user is logged in */}
          {crruser && (
            <ul className="navbar-nav me-auto main-nav">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to='home'>
                  <i className="fas fa-home me-2"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to='movies'>
                  <i className="fas fa-film me-2"></i>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" to='tv'>
                  <i className="fas fa-tv me-2"></i>
                  TV Shows
                </Link>
              </li>
            </ul>
          )}
          
          {/* Right Side Navigation */}
          <ul className="navbar-nav ms-auto right-nav">
            {/* Social Media Icons */}
            <li className="nav-item social-icons">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className='fab fa-facebook'></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className='fab fa-instagram'></i>
              </a>
              <a href="#" className="social-link" aria-label="Spotify">
                <i className='fab fa-spotify'></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className='fab fa-twitter'></i>
              </a>
            </li>
            
            {/* User Actions */}
            {crruser ? (
              <li className="nav-item">
                <button 
                  onClick={clrUser} 
                  className="btn btn-outline-danger logout-btn"
                  aria-label="Logout"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary auth-btn" to='register'>
                    <i className="fas fa-user-plus me-2"></i>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-success auth-btn" to='login'>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
