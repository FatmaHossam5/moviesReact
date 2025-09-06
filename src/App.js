import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Movies from './Component/Movies/Movies';
import TvShows from './Component/TvShows/TvShows';
import MovieDetails from './Component/MovieDetails/MovieDetails'
import TvDetails from './Component/TvDetails/TvDetails'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';


function App() {
  function ProtectedRoute(props){
    if(localStorage.getItem("tkn")==null){
      return <Navigate to="/login"/>
    }else{
      return props.children
    }
  }
 const navigate=useNavigate()
const[currentUser,setCurrentUser]=useState(null)
function decodeToken(){
 let userLog= jwtDecode(localStorage.getItem('tkn'))
 setCurrentUser(userLog)
}
function clearUserData(){
  localStorage.removeItem('tkn')
  setCurrentUser(null)
  navigate('/login')
}
useEffect(()=>{

  if(localStorage.getItem('tkn')!=null){
   
    decodeToken();
  }
},[])

  return <>
    <Navbar crruser={currentUser} clrUser={clearUserData}/>
    <Routes>
    <Route path='home' element={<Home/>}/>
    <Route path='login' element={<Login decodeToken={decodeToken}/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
    <Route path='tv' element={<ProtectedRoute><TvShows/></ProtectedRoute>}/>
    <Route path='moviedetails/:id' element={<MovieDetails/>}/>
    <Route path='tvdetails/:id' element={<TvDetails/>}/>

    <Route path='*' element={<div className='vh-100 d-flex align-items-center justify-content-center'><h1>404</h1></div>}/>
    <Route path='/' element={<Home/>}/>

    </Routes>



  
  </>


  ;
  
}

export default App;
