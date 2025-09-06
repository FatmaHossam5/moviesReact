import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [tvArray, settTvArray]=useState(null)
  const [movies, setMovie]=useState(null)
  const [loading, setLoading] = useState(true)
  
  async function movieAPI(){
    try {
      let{data}= await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
      setMovie(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }
  
  async function tvShows(){
    try {
      let{data}= await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
      settTvArray(data.results)
    } catch (error) {
      console.error('Error fetching TV shows:', error)
    }
  }
  
  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([tvShows(), movieAPI()])
      setLoading(false)
    }
    fetchData()
  },[]);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <i className="fa-solid fa-spinner loading-spinner"></i>
          <p className="loading-text">Loading trending content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="container-fluid px-3 px-md-4">
        {/* Movies Section */}
        <section className="movies-section mb-5">
          <div className="row mb-4">
            <div className="col-12">
              <div className="section-header">
                <h2 className="section-title">Trending Movies</h2>
                <p className="section-subtitle">Most watched movies this week</p>
              </div>
            </div>
          </div>
          
          <div className="row g-3 g-md-4">
            {movies?.slice(0, 10).map((movie, idx) => (
              <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link 
                  to={`/moviedetails/${movie.id}`} 
                  className="movie-card-link"
                  aria-label={`View details for ${movie.title} movie`}
                >
                  <div className="movie-card">
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
                          <h6 className="movie-title">{movie.title}</h6>
                          <div className="movie-rating">
                            <i className="fa-solid fa-star text-warning me-1" aria-hidden="true"></i>
                            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* TV Shows Section */}
        <section className="tv-section">
          <div className="row mb-4">
            <div className="col-12">
              <div className="section-header">
                <h2 className="section-title">Trending TV Shows</h2>
                <p className="section-subtitle">Most watched TV shows this week</p>
              </div>
            </div>
          </div>
          
          <div className="row g-3 g-md-4">
            {tvArray?.slice(0, 10).map((tv, idx) => (
              <div key={tv.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <Link 
                  to={`/tvdetails/${tv.id}`} 
                  className="tv-card-link"
                  aria-label={`View details for ${tv.name} TV show`}
                >
                  <div className="tv-card">
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
                          <h6 className="tv-title">{tv.name}</h6>
                          <div className="tv-rating">
                            <i className="fa-solid fa-star text-warning me-1" aria-hidden="true"></i>
                            <span>{tv.vote_average?.toFixed(1) || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
