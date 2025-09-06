import React,{useState} from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({decodeToken}) {
  let navigate=useNavigate();
  const[loginFlag,setLoginFlag]=useState(false);
  const[failedMsg,setFailedMsg]=useState('');
  const[errList,setErrList]=useState([]);
  const[showPassword,setShowPassword]=useState(false);
  const[user,setUser]=useState({
      email:'',
      password:'',
  });
  function getUser(e){
    setErrList([]);
    setFailedMsg('');
    let inputValue = e.target.value;
    let newUser = {...user};
    newUser[`${e.target.id}`] = inputValue;
    setUser(newUser);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  async function submitForm(e){
      e.preventDefault();
      setLoginFlag(true);
      setFailedMsg('');
      setErrList([]);

      let entry = Joi.object({
          email: Joi.string().email({tlds:{allow:['com','net']}}).required(),
          password: Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required(),
      });
      
      let joiResponse = entry.validate(user, {abortEarly: false});
      
      if(joiResponse.error){
          setErrList(joiResponse.error.details);
          setLoginFlag(false);
      } else {
          try {
              let {data} = await axios.post('https://route-movies-api.vercel.app/signin', user);
              if(data.message === "incorrect password"){
                  setFailedMsg(data.message);
              } else {
                  localStorage.setItem("tkn", data.token);
                  decodeToken();
                  navigate('/home');
              }
          } catch (error) {
              setFailedMsg('Login failed. Please check your credentials and try again.');
          }
          setLoginFlag(false);
      }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={submitForm} className="login-form">
          {failedMsg && (
            <div className="login-alert">
              <i className="fa-solid fa-exclamation-triangle"></i>
              {failedMsg}
            </div>
          )}

          {errList.map((err, idx) => (
            <div key={idx} className="login-alert">
              <i className="fa-solid fa-exclamation-circle"></i>
              {err.message}
            </div>
          ))}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input 
              onChange={getUser} 
              type="email" 
              className="form-control" 
              id="email"
              placeholder="Enter your email address"
              value={user.email}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                onChange={getUser}
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                id="password"
                placeholder="Enter your password"
                value={user.password}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={loginFlag}
            aria-label={loginFlag ? "Signing in, please wait" : "Sign in to your account"}
          >
            {loginFlag ? (
              <>
                <i className="fa-solid fa-spinner fa-spin spinner" aria-hidden="true"></i>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-sign-in-alt" aria-hidden="true"></i>
                <span>Sign In to Continue</span>
              </>
            )}
          </button>
          
          <div className="login-footer">
            <p className="login-footer-text">
              Don't have an account? 
              <a href="/register" className="btn-link" aria-label="Create a new account">
                Create one here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}


