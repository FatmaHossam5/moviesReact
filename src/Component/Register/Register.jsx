import React ,{useState} from 'react'
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
export default function Register() {
    let navigate=useNavigate();
    const[failedMsg,setFailedMsg]=useState('');
    const[errList,setErrList]=useState([]);
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
        }else{
         let {data}= await axios.post('https://routeegypt.herokuapp.com/signup',user)
         if(data.errors){
            setFailedMsg(data.message)

         }
         else{
            navigate('/login')
         }
        }
    }
  return <>
  <div className="w-75 mx-auto">
  <form onSubmit={submitForm}>
    {failedMsg.length==0?'':<div className='alert alert-danger'>{failedMsg}</div>}


    <label htmlFor="first_name">first_name</label>
    <input onChange={getUser} type="text" className='form-control my-3' id="first_name"placeholder='first_name' />
{ getCurrentError("first_name").length==0? '':<div className='alert alert-danger'>{ getCurrentError("first_name")}</div>}
    <label htmlFor="last_name">last_name</label>
    <input onChange={getUser} type="text" className='form-control my-3' id="last_name"placeholder='last_name' />
    { getCurrentError("last_name").length==0?'':<div className='alert alert-danger'>{ getCurrentError("last_name")}</div>}
    <label htmlFor="age">age</label>
    <input onChange={getUser}  type="number" className='form-control my-3' id="age"placeholder='age' />
    { getCurrentError("age").length==0?'':<div className='alert alert-danger'>{ getCurrentError("age")}</div>}
    <label htmlFor="email">email</label>
    <input onChange={getUser} type="email" className='form-control my-3' id="email"placeholder='email' />
    { getCurrentError("email").length==0?'':<div className='alert alert-danger'>{ getCurrentError("email")}</div>}
    <label htmlFor="password">password</label>
    <input  onChange={getUser}type="password" className='form-control my-3' id="password"placeholder='password' />
    { getCurrentError("password").length==0?'':<div className='alert alert-danger'>{ getCurrentError("password")}</div>}
    <button className='btn btn-outline-info'>Register</button>
 </form>
  </div>
 
  </>
}
