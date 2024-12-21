import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import logo from '../../../img/logo-movie.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);
    setErrorMessage(''); // Clear error message when user types
    if (type === 'email') setEmail(event.target.value);
    if (type === 'password') setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');
    setErrorMessage(''); 
    try {
      const res = await axios.post('http://localhost:3000/user/login', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/main/home');
      setStatus('idle');
    } catch (e)  {
      if (e.response && e.response.status === 401) {
        setErrorMessage('Incorrect Email or Password. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      setStatus('idle');
    }
  };


  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    
    <div className='Login'>
      <div className="movie-logo">
       <img src={logo} alt="Logo" />
      </div>
      <div className='main-container'>
        <form>
          <div className='form-container'>
            <h3>Login</h3>

            
            {errorMessage && <span className='login errors'>{errorMessage}</span>}
            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <div className="input-box">
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  value={email}
                  onChange={(e) => handleOnChange(e, 'email')}
                />

                </div>
                
              </div>
              {debounceState && isFieldsDirty && email == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <div className="input-box">
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
                </div>
               
              </div>
              {debounceState && isFieldsDirty && password == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password) {
                    handleLogin();
                  } else {
                    setIsFieldsDirty(true);
                    if (email == '') {
                      emailRef.current.focus();
                    }

                    if (password == '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Login' : 'Loading'}
              </button>
            </div>
            <div className='register-container'>
              <a href='/register'>
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

//carolvillareal@mail.com
//carol22