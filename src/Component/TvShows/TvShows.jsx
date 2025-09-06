import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './TvShows.css'

export default function TvShows() {
  const [tvArray, setTvArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchTvShows() {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
      setTvArray(data.results)
    } catch (err) {
      console.error('Error fetching TV shows:', err)
      setError('Failed to load TV shows. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTvShows()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'Release date not available'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="tvshows-container">
        <div className="tvshows-loading">
          <i className="fa-solid fa-spinner loading-spinner"></i>
          <p className="loading-text">Loading trending TV shows...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="tvshows-container">
        <div className="tvshows-error">
          <i className="fa-solid fa-exclamation-triangle error-icon"></i>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchTvShows}>
            <i className="fa-solid fa-refresh me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="tvshows-container">
      <div className="tvshows-header">
        <h1 className="tvshows-title">Trending TV Shows</h1>
        <p className="tvshows-subtitle">
          Discover the most popular TV shows this week. From binge-worthy series to 
          critically acclaimed dramas, find your next favorite show.
        </p>
      </div>
      
      <div className="tvshows-grid">
        {tvArray.map((tv) => (
          <div 
            key={tv.id} 
            className="tv-card"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${tv.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                // Add navigation logic here if needed
                console.log('Navigate to TV show details:', tv.id)
              }
            }}
          >
            <Link 
              to={`/tvdetails/${tv.id}`} 
              className="tv-card-link"
              aria-label={`View details for ${tv.name} TV show`}
            >
              <div className="tv-poster-container">
                <img 
                  className="tv-poster"
                  src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} 
                  alt={`${tv.name} TV show poster`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450/2a2d3a/ffffff?text=No+Image'
                  }}
                />
                <div className="tv-overlay">
                  <div className="tv-info">
                    <h3 className="tv-title">{tv.name}</h3>
                    <div className="tv-rating">
                      <i className="fa-solid fa-star"></i>
                      <span>{tv.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <p className="tv-release-date">
                      {formatDate(tv.first_air_date)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
