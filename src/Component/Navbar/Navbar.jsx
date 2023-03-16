import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({crruser, clrUser}) {
  return <>
  
  <nav class="navbar navbar-expand-lg  navbar-dark bg-transparent">
  <div class="container-fluid">
    <Link class="navbar-brand" to=''> Noxe </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
   {crruser? <ul class="navbar-nav me-auto  d-flex align-items-center mb-2 mb-lg-0">
    
    <li class="nav-item">
      <Link class="nav-link active" aria-current="page"to='home'>Home</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to='movies'>Movies</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to='tv'>Tv Shows</Link>
    </li>

  </ul>:""}
    <ul class="navbar-nav ms-auto  d-flex align-items-center mb-2 mb-lg-0">
    <li class="nav-item">
    <i className='fa-brands me-3 fa-facebook'></i>
    <i className='fa-brands me-3 fa-instagram'></i>
    <i className='fa-brands me-3 fa-spotify'></i>
     <i className='fa-brands me-3 fa-twitter'></i>
        </li>
        {crruser?  <li class="nav-item">
          <span  onClick ={clrUser}class="nav-link">logout</span>
        </li>: <>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page"to='register'>Register</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='login'>Login</Link>
        </li></> }
      
      

      </ul>
    </div>
  </div>
</nav>
  
  
  </>
}
