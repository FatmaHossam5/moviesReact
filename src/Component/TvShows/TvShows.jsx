import React, { useEffect,useState } from 'react'
import axios from 'axios'

export default function TvShows() {
    const [tvArray, settTvArray]=useState([])
    async function tvShows(){
        let{data}= await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1c138bc3fffc56003b8bb56711b1f4ca')
        settTvArray(data.results)
      }
      useEffect(()=>{
        tvShows();
      },[])



  return <>
  
  <div className="container">
   
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
  </div>

  
  </>
}
