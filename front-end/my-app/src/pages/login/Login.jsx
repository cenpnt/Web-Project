import React from 'react';
import "./Login.css";
import Logo from "../../components/Logo";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const { login, internetIPAddress } = useAuth();
  const inputRef = useRef(null);

  const focusInput = () => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${internetIPAddress}token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ // Use URLSearchParams to encode
          username,
          password
        }),
      });

      if (response.ok) {
        // successful login
        const data = await response.json();
        login(data.access_token);
        navigate('/u_student');
      } else {
        // Error
        const errorData = await response.json();
        setError(errorData.detail);
        setInputError(true);
        setPassword("");
        focusInput();
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>Sign in</h1>
      </div>
      <div className="form-container">
        <div className="login-logo-container">
          <Logo
            src="https://www.se.kmitl.ac.th/assets/se.png"
            alt="SE-logo"
            width="150"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Username or email address
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");  // Clear error when user types
                setInputError(false);  // Remove error highlight
              }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`password ${inputError ? "input-error" : ""}`}
              value={password}
              onChange={(e) =>{
                setPassword(e.target.value);
                setError("");  // Clear error when user types
                setInputError(false);  // Remove error highlight
              }}
              ref={inputRef}
            />
          </label>
          {error && <p className="error">{typeof error === 'string' ? error : 'An error occurred'}</p>}
          <button type="submit" className='loginButton'>Sign in </button>
        </form>
      </div>
    </div>
  );
}

export default Login;