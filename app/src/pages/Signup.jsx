import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage"
import Header from "../components/Header"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const [error, setError] = useState(null)

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = async () => {
    try {
      const { name, email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      if (!validateEmail(formValues.email)) {
        setError('Invalid Email');
      }

     else if (formValues.password.length < 8) {
        setError('Password must be at least 8 chars long');
      }
    
      else {
        setError('Enter Name!');
      }
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/')
  })
  return (
    <Container>
      <BackgroundImage />

      <div className='content'>
        <div className='body flex a-center j-center column'>
          <div className='text column flex'>
            <h1>Movies, TV Shows and More!</h1>
            <h4>Watch Anywhere || Cancel Anytime</h4>
            <h6>Ready To Watch? Enter Your Credentials Or Buy Subscription!</h6>
          </div>
          <div className='form flex column a-center j-center'>
          {error && <div style={{ color: 'red' , textAlign:"center" }}>{error}</div>}

            <input type='text'
              placeholder='Enter Your Name'
              name='name'
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
            <input type='email'
              placeholder='Enter Your Email'
              name='email'
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
            {showPassword && (
              <input type='password'
                placeholder='Enter Your Password'
                name='password'
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}

          </div>
          <button onClick={handleSignIn}>Sign Up</button>
          <p>Or</p>
          <button onClick={() => navigate('/login')}>Sign In</button>

        </div>
      </div>
    </Container>
  )
};

const Container = styled.div`
position:relative;
.content{
  position:absolute;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.5);
  height:100vh;
  width:100vw;
  display:grid;
  grid-template-rows:15vh 85vh;
  .body{
    gap:1rem;
    margin-top:25%;
  }
  .text{
    gap:1rem;
    text-align:center;
    font-size:2rem;
    h1{
      padding: 0 25rem;
    }
  }
  .form{
    padding: 2rem;
    background-color:#000000b0;
    width:28vw;
    gap:2rem;
    color:white;
  
    input{
      color:black;
      border:none;
      padding:1.5rem;
      font-size:1.2rem;
      border:1px solid  black;
      &:focus{
        outline:none;
      }
    }
    button{
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border:none;
      cursor:pointer;
      color:white;
      font-weight:bolder;
      font-size:1.05rem;
    }
  }
  button{
    padding: 0.5rem 1rem;
  background-color: #e50914;
  border:none;
  cursor:pointer;
  color:white;
  border-radius: 0.2rem;
  font-weight:bolder;
  font-size:1.05rem;
  }
}

`;
