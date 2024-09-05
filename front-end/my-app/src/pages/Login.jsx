import './Login.css';
import Logo from '../components/Logo';

function Login() {
    return (
      <div className="main-container">
        <div className='title-container'>
            <h1>Sign in</h1>
        </div>
        <div className='form-container'>
            <div className='logo-container'>
                <Logo src="https://www.se.kmitl.ac.th/assets/se.png" alt="SE-logo" width="150"/>
            </div>
            <form method='post' action=''>
                <label>Username or email address
                    <input type="text" name="username"  placeholder='Username' className='username'/>
                </label>
                <label>Password
                    <input type="password" name="password" placeholder='Password' className='password'/>
                </label>
                <button type="submit">Sign in </button>
            </form>
        </div>
      </div>
    );
  }
  
  export default Login;