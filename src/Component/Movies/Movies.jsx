import React, { useEffect,useState } from 'react'
import axios from "axios"

export default function Movies() {

    const [movies, setMovie]=useState([])



    async function movieAPI(){
        let{data}= await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
        setMovie(data.results)
      }
      useEffect(()=>{
        movieAPI();
      },[])
  return <>
  
  
 
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <div className="title">
          <h3>Trending Movie To Watch</h3>
          <p className='text-muted'>most watched movie by week</p>
        </div>
      </div>
      {movies.map((movie,idx)=><>
        <div className="col-md-2">
          <div className="movie">
            <img  className =" w-100"src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="image" />
            <h5>{movie.title}</h5>
          </div>
        </div>
      
      </>)}
     
    </div>
   
  </div>
  </>
}
