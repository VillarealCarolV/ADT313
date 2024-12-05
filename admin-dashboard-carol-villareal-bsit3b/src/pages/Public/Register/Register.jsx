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
  const [role, setRole] = useState('user'); // State for role
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

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
    setErrorMessage(''); // Reset the error message when fields change

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
      case 'role':
        setRole(event.target.value);
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
      contactNo: contactnum,
      role, // This is already included
    };
  
    console.log("Registration Data:", data); // Log the data to see if role is included
  
    setStatus('loading');
  
    try {
      const res = await axios.post('/admin/register', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log("Response:", res); // Log the response from the server
      localStorage.setItem('accessToken', res.data.access_token);
      setShowModal(true);
  
      // Reset the fields after submission
      setFirstname('');
      setMiddlename('');
      setLastname('');
      setContactNum('');
      setEmail('');
      setPassword('');
      setRole('user'); // Reset role after submission
    } catch (error) {
      console.error("Registration Error:", error);
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
      <div className='main-container-reg'>
      
        <form>
          
          <div className='reg-form-container'>
            <div className='title-Reg'>Register</div>
              {/* New Role Selection */}
              <div>
              <div className='form-group-reg'>
                <label className='role-reg'>Role:</label>
                <select value={role} onChange={(e) => handleOnChange(e, 'role')}>
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
            </div>

            {/* Existing form fields */}
            <div className='userdetails'>
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='userdetails'>
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='userdetails'>
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='userdetails'>
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='userdetails'> 
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='userdetails'>
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
                <span className='errors-reg'>This field is required</span>
              )}
            </div>
            <div className='show-password-reg' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

          
            {/* Display error message */}
            {errorMessage && <p className='error-message'>{errorMessage}</p>}

            {/* Submit button */}
            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (firstname && middlename && lastname && contactnum && email && password && role) {
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
