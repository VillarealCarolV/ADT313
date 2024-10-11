<<<<<<< HEAD
import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [contactnum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'firstname':
        setFirstname(event.target.value);
        break;
      case 'middlename':
        setMiddlename(event.target.value);
        break;
      case 'lastname':
        setLastname(event.target.value);
        break;
      case 'contactnum':
        setContactNum(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    const data = {
      email,
      password,
      firstName: firstname,
      middleName: middlename,
      lastName: lastname,
      contactNo: contactnum   
    };
    
    setStatus('loading');
    console.log(data);

    try {
      const res = await axios.post('/user/register', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(res);
      localStorage.setItem('accessToken', res.data.access_token);

      
      setShowModal(true);

      setFirstname('');
      setMiddlename('');
      setLastname('');
      setContactNum('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error(error);
      setStatus('idle');
    } finally {
      setStatus('idle'); 
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

 
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div>
              <div className='form-group'>
                <label>Firstname: </label>
                <input
                  type='text'
                  name='firstname'
                  value={firstname} 
                  onChange={(e) => handleOnChange(e, 'firstname')} 
                />
              </div>
              {debounceState && isFieldsDirty && firstname === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Middle Name: </label>
                <input
                  type='text'
                  name='middlename'
                  value={middlename} 
                  onChange={(e) => handleOnChange(e, 'middlename')} 
                />
              </div>
              {debounceState && isFieldsDirty && middlename === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Last Name: </label>
                <input
                  type='text'
                  name='lastname'
                  value={lastname} 
                  onChange={(e) => handleOnChange(e, 'lastname')} 
                />
              </div>
              {debounceState && isFieldsDirty && lastname === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Contact Number: </label>
                <input
                  type='text'
                  name='contactnum'
                  value={contactnum} 
                  onChange={(e) => handleOnChange(e, 'contactnum')} 
                />
              </div>
              {debounceState && isFieldsDirty && contactnum === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  value={email} 
                  onChange={(e) => handleOnChange(e, 'email')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  value={password} 
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password === '' && (
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
                  if (firstname && middlename && lastname && contactnum && email && password) {
                    handleRegister(); 
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    }
                    if (password === '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>
            <div className='log-in-container'>
              <a href='/'>
                <small>Already Have An Account? Log In</small>
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* Modal for success message */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h4>Success!</h4>
            <p>Your account has been successfully created.</p>
            <button className='close-button' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
=======
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
>>>>>>> f407cd4eb0e060fd3568449314cf51adb0df15d1
