import React ,{useState} from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
 
export default function Register() {
    let navigate=useNavigate();
    const[failedMsg,setFailedMsg]=useState('');
    const[errList,setErrList]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[user,setUser]=useState({
        first_name:'',
        last_name:'',
        age: 0,
        email:'',
        password:'',
    });
    function getCurrentError(key){
        for (const err of errList) {
            if(err.context.key===key){
                return err.message
            }
            
        }
        return'';
    }
    function getUser(e){
        setErrList([])
        let inputValue =e.target.value;
        let newUser={...user};
        newUser[e.target.id]=inputValue;
     
        setUser(newUser)
    }
    async function submitForm(e){
        e.preventDefault();
        setIsLoading(true);
        setFailedMsg('');
        setErrList([]);
        
        let entry=Joi.object({
            first_name:Joi.string().alphanum().min(3).max(10).required(),
            last_name:Joi.string().min(3).max(10).required(),
            age:Joi.number().min(18).max(60).required(),
            email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
            password:Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required(),
        });
        let joiResponse=entry.validate(user,{abortEarly:false});
        if(joiResponse.error){
            setErrList(joiResponse.error.details);
            setIsLoading(false);
        }else{
         try {
            let {data}= await axios.post('https://route-movies-api.vercel.app/signup',user)
            if(data.errors){
               setFailedMsg(data.message)
            }
            else{
               navigate('/login')
            }
         } catch (error) {
            setFailedMsg('Registration failed. Please try again.');
         } finally {
            setIsLoading(false);
         }
        }
    }
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join our movie community today</p>
        </div>
        
        <form onSubmit={submitForm} className="register-form" noValidate>
          {/* Global Error Message */}
          {failedMsg && (
            <div className="alert alert-danger register-alert" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {failedMsg}
            </div>
          )}

          {/* Name Fields Row */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input 
                  onChange={getUser} 
                  type="text" 
                  className={`form-control ${getCurrentError("first_name") ? 'is-invalid' : ''}`}
                  id="first_name"
                  placeholder="Enter your first name"
                  value={user.first_name}
                  required
                  aria-describedby={getCurrentError("first_name") ? "first_name-error" : undefined}
                />
                {getCurrentError("first_name") && (
                  <div id="first_name-error" className="invalid-feedback">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {getCurrentError("first_name")}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input 
                  onChange={getUser} 
                  type="text" 
                  className={`form-control ${getCurrentError("last_name") ? 'is-invalid' : ''}`}
                  id="last_name"
                  placeholder="Enter your last name"
                  value={user.last_name}
                  required
                  aria-describedby={getCurrentError("last_name") ? "last_name-error" : undefined}
                />
                {getCurrentError("last_name") && (
                  <div id="last_name-error" className="invalid-feedback">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {getCurrentError("last_name")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Age and Email Row */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  Age <span className="text-danger">*</span>
                </label>
                <input 
                  onChange={getUser} 
                  type="number" 
                  className={`form-control ${getCurrentError("age") ? 'is-invalid' : ''}`}
                  id="age"
                  placeholder="Enter your age"
                  value={user.age || ''}
                  min="18"
                  max="60"
                  required
                  aria-describedby={getCurrentError("age") ? "age-error" : undefined}
                />
                {getCurrentError("age") && (
                  <div id="age-error" className="invalid-feedback">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {getCurrentError("age")}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input 
                  onChange={getUser} 
                  type="email" 
                  className={`form-control ${getCurrentError("email") ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter your email"
                  value={user.email}
                  required
                  aria-describedby={getCurrentError("email") ? "email-error" : undefined}
                />
                {getCurrentError("email") && (
                  <div id="email-error" className="invalid-feedback">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {getCurrentError("email")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className="password-input-wrapper">
              <input 
                onChange={getUser} 
                type="password" 
                className={`form-control ${getCurrentError("password") ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Create a secure password"
                value={user.password}
                required
                aria-describedby={getCurrentError("password") ? "password-error" : "password-help"}
              />
            </div>
            <div id="password-help" className="form-text">
              Password must be 4-8 characters, letters and numbers only
            </div>
            {getCurrentError("password") && (
              <div id="password-error" className="invalid-feedback">
                <i className="fas fa-exclamation-circle me-1"></i>
                {getCurrentError("password")}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg register-btn"
              disabled={isLoading}
              aria-label={isLoading ? "Creating your account, please wait" : "Create your new account"}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2" aria-hidden="true"></i>
                  <span>Create My Account</span>
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="register-footer">
            <p className="register-footer-text">
              Already have an account? 
              <button 
                type="button" 
                className="btn btn-link register-link-btn"
                onClick={() => navigate('/login')}
                aria-label="Go to sign in page"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
