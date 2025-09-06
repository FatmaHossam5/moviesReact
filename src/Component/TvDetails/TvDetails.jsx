import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import './TvDetails.css'

export default function TvDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tvObj, setTvDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getTvDetails() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=1c138bc3fffc56003b8bb56711b1f4ca&language=en-US`);
      setTvDetails(data);
    } catch (err) {
      setError('Failed to load TV show details. Please try again.');
      console.error('Error fetching TV show details:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTvDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    getTvDetails();
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

  const formatRuntime = (episodeRunTime) => {
    if (!episodeRunTime || episodeRunTime.length === 0) return 'N/A';
    const avgRuntime = episodeRunTime.reduce((a, b) => a + b, 0) / episodeRunTime.length;
    return `${Math.round(avgRuntime)} min`;
  };

  if (loading) {
    return (
      <div className="tv-details-container">
        <div className="tv-details-loading">
          <i className="fas fa-spinner loading-spinner"></i>
          <p className="loading-text">Loading TV show details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tv-details-container">
        <div className="tv-details-error">
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
    <div className="tv-details-container">
      <div className="tv-details-content">
        <button 
          className="back-button" 
          onClick={handleBackClick}
          aria-label="Go back to previous page"
        >
          <i className="fas fa-arrow-left"></i>
          Back
        </button>

        <div className="tv-main-content">
          <div className="row g-0">
            <div className="col-lg-4">
              <div className="tv-poster-section">
                <div className="tv-poster-container">
                  <img 
                    className="tv-poster"
                    src={tvObj.poster_path ? `https://image.tmdb.org/t/p/original/${tvObj.poster_path}` : '/placeholder-tv.jpg'}
                    alt={`${tvObj.original_name || tvObj.name || 'TV Show'} poster`}
                    onError={(e) => {
                      e.target.src = '/placeholder-tv.jpg';
                    }}
                  />
                  <div className="tv-poster-overlay">
                    <div className="tv-type-indicator">
                      <i className="fas fa-tv"></i>
                      <span>TV Series</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              <div className="tv-info-section">
                <h1 className="tv-title">{tvObj.original_name || tvObj.name || 'Unknown Title'}</h1>
                
                {tvObj.tagline && (
                  <p className="tv-tagline">"{tvObj.tagline}"</p>
                )}

                {tvObj.genres && tvObj.genres.length > 0 && (
                  <div className="tv-genres">
                    {tvObj.genres.map((genre, idx) => (
                      <span key={idx} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="tv-stats">
                  <div className="stat-item">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value rating">
                      <i className="fas fa-star"></i> {formatRating(tvObj.vote_average)}
                    </span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Vote Count</span>
                    <span className="stat-value">{formatNumber(tvObj.vote_count)}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Popularity</span>
                    <span className="stat-value popularity">{formatNumber(tvObj.popularity)}</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">First Air Date</span>
                    <span className="stat-value">{formatDate(tvObj.first_air_date)}</span>
                  </div>

                  {tvObj.last_air_date && (
                    <div className="stat-item">
                      <span className="stat-label">Last Air Date</span>
                      <span className="stat-value">{formatDate(tvObj.last_air_date)}</span>
                    </div>
                  )}

                  <div className="stat-item">
                    <span className="stat-label">Status</span>
                    <span className="stat-value status">{tvObj.status || 'N/A'}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">Seasons</span>
                    <span className="stat-value">{tvObj.number_of_seasons || 'N/A'}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">Episodes</span>
                    <span className="stat-value">{tvObj.number_of_episodes || 'N/A'}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">Episode Runtime</span>
                    <span className="stat-value">{formatRuntime(tvObj.episode_run_time)}</span>
                  </div>
                </div>

                {tvObj.overview && (
                  <div className="tv-overview-section">
                    <h2 className="overview-title">Overview</h2>
                    <p className="tv-overview">{tvObj.overview}</p>
                  </div>
                )}

                {tvObj.created_by && tvObj.created_by.length > 0 && (
                  <div className="tv-creators-section">
                    <h3 className="creators-title">Created By</h3>
                    <div className="creators-list">
                      {tvObj.created_by.map((creator, idx) => (
                        <span key={idx} className="creator-name">
                          {creator.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="tv-actions">
                  <button 
                    className="action-button primary"
                    onClick={() => {
                      // Add to favorites functionality
                      console.log('Add to favorites:', tvObj.id);
                    }}
                    aria-label={`Add ${tvObj.original_name || tvObj.name} to favorites`}
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
                          title: tvObj.original_name || tvObj.name,
                          text: tvObj.overview,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    aria-label={`Share ${tvObj.original_name || tvObj.name}`}
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
