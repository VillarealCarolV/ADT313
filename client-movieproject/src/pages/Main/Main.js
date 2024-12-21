import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';
import Logo from "../../img/logo-movie.png"

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); 
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout(); 
    }
  }, [accessToken]);

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
        <h2 className='logo' ><img src={`${Logo}`}>
        </img></h2>
          <ul>
            <li>
              <a onClick={() => navigate('/main/movies')}>Movies</a>
            </li>
            
              <li className='logout'>
                <a onClick={handleLogout}>Logout</a>
              </li>
            
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
