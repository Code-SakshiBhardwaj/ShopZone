import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import Popup from '../components/popup/popup';
import errorImg from '../components/assets/icons/error.png'

const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:"",
  })
  const [errorMsg,setErrorMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async () => {
    console.log("Login function executed!",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      setErrorMsg(responseData.error);
      togglePopup();
    }
  }
  const signup = async () => {
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      setErrorMsg(responseData.error);
      togglePopup();
    }
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Your name'/>:<></>}
          <input type='email' name='email' value={formData.email} onChange={changeHandler} placeholder='Email address'/> 
          <input type='password' name='password' value={formData.password} onChange={changeHandler} placeholder='Password'/>
        </div>
        <button onClick={state==="Login"?login:signup}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">
          Already have an account?<span onClick={() => setState("Login")}> Login here</span>
        </p>:<p className="loginsignup-login">
          Create an account?<span onClick={() => setState("Sign Up")}> Click here</span>
        </p>}
        
        
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>

      <Popup show={showPopup} handleClose={togglePopup} message={errorMsg} image={errorImg}></Popup>

      
    </div>
  )
}

export default LoginSignup
