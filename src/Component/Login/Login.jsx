import React,{useState} from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({decodeToken}) {
  let navigate=useNavigate();
  const[loginFlag,setLoginFlag]=useState(false);
  const[failedMsg,setFailedMsg]=useState('');
  const[errList,setErrList]=useState([]);
  const[user,setUser]=useState({
      email:'',
      password:'',
  });
  function getUser(e){
    setErrList([])
      let inputValue =e.target.value;
      let newUser={...user};
      newUser[`${e.target.id}`]=inputValue;
      console.log(newUser)
      setUser(newUser)
  }
  async function submitForm(e){
      e.preventDefault();
      setLoginFlag(true)

      let entry=Joi.object({
          email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
          password:Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required(),
      });
      let joiResponse=entry.validate(user,{abortEarly:false});
      if(joiResponse.error){
          setErrList(joiResponse.error.details);
          setLoginFlag(false)
      }else{
       let {data}= await axios.post('https://routeegypt.herokuapp.com/signin',user)
       if(data.message=="incorrect password"){
          setFailedMsg(data.message)

       }
       else{

localStorage.setItem("tkn",data.token)
decodeToken()
          navigate('/home')
       }
       setLoginFlag(false)
      }
  }
  return  <>
  <div className="w-75 mx-auto">
  <form onSubmit={submitForm}>
    {failedMsg.length==0?'':<div className='alert alert-danger'>{failedMsg}</div>}

    {errList.map((err,idx)=><div  key= {idx}className='alert alert-danger'>{err.message}</div>)}
    
    <label htmlFor="email">email</label>
    <input onChange={getUser} type="email" className='form-control my-3' id="email"placeholder='email' />
    <label htmlFor="password">password</label>
    <input  onChange={getUser}type="password" className='form-control my-3' id="password"placeholder='password' />
    <button className='btn btn-outline-info'>


        {loginFlag? <i className='fa-solid fa-spinner fa-spin'></i> : "login"}
    </button>
 </form>
  </div>
 
  </>
}


