import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import './MovieDetails.css'

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieObj, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getMovieDetails() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1c138bc3fffc56003b8bb56711b1f4ca&language=en-US`);
      setMovieDetails(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    getMovieDetails();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const formatRating = (rating) => {
    if (!rating) return 'N/A';
    return rating.toFixed(1);
  };

  if (loading) {
    return (
      <div className="movie-details-container">
        <div className="movie-details-loading">
          <i className="fas fa-spinner loading-spinner"></i>
          <p className="loading-text">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-container">
        <div className="movie-details-error">
          <i className="fas fa-exclamation-triangle error-icon"></i>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            <i className="fas fa-redo"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <button 
          className="back-button" 
          onClick={handleBackClick}
          aria-label="Go back to previous page"
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>

        <div className="movie-main-content">
          <div className="row g-0">
            <div className="col-lg-4">
              <div className="movie-poster-section">
                <div className="movie-poster-container">
                  <img 
                    className="movie-poster"
                    src={movieObj.poster_path ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}` : '/placeholder-movie.jpg'}
                    alt={`${movieObj.original_title || 'Movie'} poster`}
                    onError={(e) => {
                      e.target.src = '/placeholder-movie.jpg';
                    }}
                  />
                  <div className="movie-poster-overlay"></div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              <div className="movie-info-section">
                <h1 className="movie-title">{movieObj.original_title || 'Unknown Title'}</h1>
                
                {movieObj.tagline && (
                  <p className="movie-tagline">"{movieObj.tagline}"</p>
                )}

                {movieObj.genres && movieObj.genres.length > 0 && (
                  <div className="movie-genres">
                    {movieObj.genres.map((genre, idx) => (
                      <span key={idx} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="movie-stats">
                  <div className="stat-item">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value rating">
                      <i className="fas fa-star"></i> {formatRating(movieObj.vote_average)}
                    </span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Vote Count</span>
                    <span className="stat-value">{formatNumber(movieObj.vote_count)}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Popularity</span>
                    <span className="stat-value popularity">{formatNumber(movieObj.popularity)}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Release Date</span>
                    <span className="stat-value">{formatDate(movieObj.release_date)}</span>
                  </div>
                </div>

                {movieObj.overview && (
                  <div className="movie-overview-section">
                    <h2 className="overview-title">Overview</h2>
                    <p className="movie-overview">{movieObj.overview}</p>
                  </div>
                )}

                <div className="movie-actions">
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      // Add to favorites functionality
                      console.log('Add to favorites:', movieObj.id);
                    }}
                    aria-label={`Add ${movieObj.original_title} to favorites`}
                  >
                    <i className="fas fa-heart"></i>
                    Add to Favorites
                  </button>
                  
                  <button 
                    className="action-button secondary"
                    onClick={() => {
                      // Share functionality
                      if (navigator.share) {
                        navigator.share({
                          title: movieObj.original_title,
                          text: movieObj.overview,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    aria-label={`Share ${movieObj.original_title}`}
                  >
                    <i className="fas fa-share-alt"></i>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
