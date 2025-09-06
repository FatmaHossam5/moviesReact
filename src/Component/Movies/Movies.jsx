import React, { useEffect, useState } from 'react'
import axios from "axios"
import './Movies.css'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchMovies() {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
      setMovies(data.results)
    } catch (err) {
      console.error('Error fetching movies:', err)
      setError('Failed to load movies. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
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
      <div className="movies-container">
        <div className="movies-loading">
          <i className="fa-solid fa-spinner loading-spinner"></i>
          <p className="loading-text">Loading trending movies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movies-container">
        <div className="movies-error">
          <i className="fa-solid fa-exclamation-triangle error-icon"></i>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchMovies}>
            <i className="fa-solid fa-refresh me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1 className="movies-title">Trending Movies</h1>
        <p className="movies-subtitle">
          Discover the most popular movies this week. From blockbusters to hidden gems, 
          find your next favorite film.
        </p>
      </div>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${movie.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                // Add navigation logic here if needed
                console.log('Navigate to movie details:', movie.id)
              }
            }}
          >
            <div className="movie-poster-container">
              <img 
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                alt={`${movie.title} movie poster`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/2a2d3a/ffffff?text=No+Image'
                }}
              />
              <div className="movie-overlay">
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-rating">
                    <i className="fa-solid fa-star"></i>
                    <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                  <p className="movie-release-date">
                    {formatDate(movie.release_date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
