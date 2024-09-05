import "./Login.css";
import Logo from "../components/Logo";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // successful login
        const data = await response.json();
        console.log('Login successful:', data);
      } else {
        // Error
        const errorData = await response.json();
        setError(errorData.detail);
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign in </button>
        </form>
        {error && <p className="error">{typeof error === 'string' ? error : 'An error occurred'}</p>}
      </div>
    </div>
  );
}

export default Login;
