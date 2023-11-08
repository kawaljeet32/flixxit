import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage"
import Header from "../components/Header"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  })
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);

    }
    catch (err) {
      if (!validateEmail(formValues.email)) {
        setError('Invalid Email');
      }

     else if (formValues.password.length < 8) {
        setError('Password must be at least 8 chars long');
      }

      else {
        // No errors.
      }


    }
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/')
  })
  return (
    <Container>
      <BackgroundImage />
      <div className='content'>
        <Header />
        <div className='form-container flex column a-center j-center'>
          <div className='form flex column a-center j-center'>
            <div className='title'>
              <h2>Sign In</h2>
            </div>
            <div className='container flex column'>
              {error && <div style={{ color: 'red' }}>{error}</div>}

              <input type='email'
                placeholder='Enter Your Email'
                name='email'
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
              <input type='password'
                placeholder='Enter Your Password'
                name='password'
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              />
              <button onClick={handleLogin} onKeyDown={e => e.key === 'Enter' ? handleLogin: 
              ''}>Sign In</button>
            </div>

          </div>
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
  .form-container{
    gap:2rem;
    height:80vh;
    .form{
      padding: 2rem;
      background-color:#000000b0;
      width:28vw;
      gap:2rem;
      color:white;
      .container{
        gap:3rem;
        input{
          padding: 1rem 1rem;
          width:15rem;

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
    }
  }
}

`;
