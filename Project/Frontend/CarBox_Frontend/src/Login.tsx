import { useState } from 'react'
import './App.css'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Responsive from 'react-responsive'
import Footer from './components/Footer'

function Login() {
  

  return (
    <>


      <div className="login">
        <div className="login__container">
          <h1>Login</h1>
          <form>
            <h5>E-mail</h5>
            <input type="text" />
            <h5>Password</h5>
            <input type="password" />
            <button className="login__signInButton">Login</button>
          </form>
          <button className="login__registerButton">Create your CarBox Account</button>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Login
