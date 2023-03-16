import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Home() {
  const [tvArray, settTvArray]=useState(null)
  const [movies, setMovie]=useState(null)
  async function movieAPI(){
    let{data}= await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
    setMovie(data.results)
  }
  async function tvShows(){
    let{data}= await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
    settTvArray(data.results)
  }
  useEffect(()=>{
    tvShows();
    movieAPI();
  },[]);
  return <>
  {movies&&tvArray?<>
    <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Movie To Watch</h3>
          <p className='text-muted'>most watched movie by week</p>
        </div>
      </div>
      {movies.map((movie,idx)=><>
      
      <div   key={idx} className="col-md-2">
      <Link to ={`/moviedetails/${movie.id}` }>
          <div className="movie">
            <img  className =" w-100"src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="image" />
            <h5>{movie.title}</h5>
          </div>
          </Link>
        </div>
     
     
      </>)}
     
    </div>
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending tv To Watch</h3>
          <p className='text-muted'>most watched tv by week</p>
        </div>
      </div>
      {tvArray.map((tv,idx)=> <div key={idx} className="col-md-2">
       
          <div className="tv">
            <img  className =" w-100"src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="image" />
            <h5>{tv.name}</h5>
          </div>
        </div>)}
    
    </div>
  </div></>:<>  <div className="vh-100 d-flex justify-content-center align-items-center">
    <i className="fa-solid fa-spinner fa-5x text-white fa-spin"></i>
  </div></>}


 
  </>
}
