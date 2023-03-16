import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios"

export default function MovieDetails() {
   let {id}=useParams();
 const[movieObj,setMovieDetails] = useState({})
    async function getMovieDetails(){
    let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1c138bc3fffc56003b8bb56711b1f4ca&language=en-US`)
    setMovieDetails(data);
  
  }

   useEffect(()=>{getMovieDetails()},[])
  return <>
  <div className="container">
    <div className="row">
     
      <div className="col-md-4">
      <div className="myImg">
      <img  className="w-100"src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt="" />

        </div>
      </div>
      <div className="col-md-8">
        <h3>{movieObj.original_title}</h3>
        <p>{movieObj.tagline}</p>
        {movieObj.genres?.map((genre,idx)=> <span key={idx} className=" me-2 p-2 bg-info text-white">
        {genre.name}
        </span>)

    

        }
             <ul className='my-4'>
              <li className='details'>vote: {movieObj.vote_average}</li>
              <li className='details'>vote count:  {movieObj.vote_count}</li>
              <li className='details'> popularity: {movieObj.popularity} </li>
              <li className='details'>release_date: {movieObj.release_date}</li>
             </ul>
             <p className='ms-4'>{movieObj.overview}</p>
      </div>
    </div>
  </div>
  </>
}
