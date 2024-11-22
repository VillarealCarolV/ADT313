import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import Loading from './LoadingComp/Loading';
import imageTitle from '../img/movielogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [theme, setTheme] = useState('light');
  const emailRef = useRef();
  const passwordRef = useRef();
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(true);
  
  const idleTimeoutRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);



  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);
    if (type === 'email') setEmail(event.target.value);
    if (type === 'password') setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');
    try {
      const res = await axios.post('/admin/login', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/main/movies');
      setStatus('idle');
    } catch (e) {
      setStatus('idle');
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.className = theme === 'light' ? 'dark-mode' : 'light-mode';
  };

  return (
    <>
  {isLoading ? (
      <Loading />
    ) : (
    <div className={`main-container ${theme}-mode`}>
      <button 
        onClick={toggleTheme} 
        className={`toggle-theme-button ${theme}-mode`}
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <div className='imgtitle'>
      <img 
        src={imageTitle} 
        alt="Title" 
        className="title-image" 
      />
      </div>
      <div className={`form-container ${theme}-mode`}>
        <h3>Login</h3>
        <form>
          <div className="form-group dark-mode">
            <label className={theme}>E-mail:</label>
            <input
              type="text"
              name="email"
              className={`${theme}-mode`}
              ref={emailRef}
              value={email}
              onChange={(e) => handleOnChange(e, 'email')}
            />
            {debounceState && isFieldsDirty && email === '' && (
              <span className={`errors ${theme}-mode`}>This field is required</span>
            )}
          </div>
          <div className="form-group dark-mode">
            <label>Password:</label>
            <input
              type={isShowPassword ? 'text' : 'password'}
              name="password"
              className={`${theme}-mode`}
              ref={passwordRef}
              value={password}
              onChange={(e) => handleOnChange(e, 'password')}
            />
            {debounceState && isFieldsDirty && password === '' && (
              <span className={`errors ${theme}-mode`}>This field is required</span>
            )}
          </div>
          <div className="show-password" onClick={handleShowPassword}>
            {isShowPassword ? 'Hide' : 'Show'} Password
          </div>
          <div className="submit-container">
            <button
              type="button"
              disabled={status === 'loading'}
              className={`${theme}-mode`}
              onClick={handleLogin}
            >
              {status === 'idle' ? 'Login' : 'Loading'}
            </button>
          </div>
          <div className="register-container">
            <a href="/register" className={`${theme}-mode`}>
              <small>Register</small>
            </a>
          </div>
        </form>
      </div>
    </div>
    )}
    </>
  );

}

   
  

export default Login;
