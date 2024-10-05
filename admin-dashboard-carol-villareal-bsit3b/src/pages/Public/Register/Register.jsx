import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
 const [debounceState, setDebounceState] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
  });
  
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactRef = useRef();

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  const handleOnChange = (event, field) => {
    setIsFieldsDirty(true);
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleRegister = async () => {
    setStatus('loading');
    try {
      const response = await axios.post('/register', formData, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(response.data);
      navigate('/Login');
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setStatus('idle');
    }
  };

  const handleSubmit = () => {
    if (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      formData.contactNumber
    ) {
      handleRegister();
    } else {
      setIsFieldsDirty(true);
      if (!formData.email) emailRef.current.focus();
      if (!formData.password) passwordRef.current.focus();
      if (!formData.firstName) firstNameRef.current.focus();
      if (!formData.lastName) lastNameRef.current.focus();
      if (!formData.contactNumber) contactRef.current.focus();
    }
  };

  return (
    <div className="Register">
      <div className="main-container">
        <h3>Register</h3>
        <form>
          <div className="form-container">
            <div className="form-group">
              <label>E-mail:</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                onChange={(e) => handleOnChange(e, 'email')}
              />
              {isFieldsDirty && formData.email === '' && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name="password"
                ref={passwordRef}
                onChange={(e) => handleOnChange(e, 'password')}
              />
              {isFieldsDirty && formData.password === '' && (
                <span className="errors">This field is required</span>
              )}
              
              <div className="show-password" onClick={handleShowPassword}>
                {isShowPassword ? 'Hide' : 'Show'} Password
              </div>
            </div>

            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                ref={firstNameRef}
                onChange={(e) => handleOnChange(e, 'firstName')}
              />
              {isFieldsDirty && formData.firstName === '' && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label>Middle Name:</label>
              <input
                type="text"
                name="middleName"
                onChange={(e) => handleOnChange(e, 'middleName')}
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                ref={lastNameRef}
                onChange={(e) => handleOnChange(e, 'lastName')}
              />
              {isFieldsDirty && formData.lastName === '' && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                ref={contactRef}
                onChange={(e) => handleOnChange(e, 'contactNumber')}
              />
              {isFieldsDirty && formData.contactNumber === '' && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="submit-container">
              <button
                type="button"
                disabled={status === 'loading'}
                onClick={handleSubmit}
              >
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>

            <div className="login-container">
              <a href="/Login">
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
