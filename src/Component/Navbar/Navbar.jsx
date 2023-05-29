import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({crruser, clrUser}) {
  return <>
  
  <nav className="navbar navbar-expand-lg  navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand" to=''> Noxe </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   {crruser? <ul className="navbar-nav me-auto  d-flex align-items-center mb-2 mb-lg-0">
    
    <li className="nav-item">
      <Link className="nav-link active" aria-current="page"to='home'>Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to='movies'>Movies</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to='tv'>Tv Shows</Link>
    </li>

  </ul>:""}
    <ul className="navbar-nav ms-auto  d-flex align-items-center mb-2 mb-lg-0">
    <li className="nav-item">
    <i className='fa-brands me-3 fa-facebook'></i>
    <i className='fa-brands me-3 fa-instagram'></i>
    <i className='fa-brands me-3 fa-spotify'></i>
     <i className='fa-brands me-3 fa-twitter'></i>
        </li>
        {crruser?  <li className="nav-item">
          <span  onClick ={clrUser}className="nav-link">logout</span>
        </li>: <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to='register'>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='login'>Login</Link>
        </li></> }
      
      

      </ul>
    </div>
  </div>
</nav>
  
  
  </>
}
