  import { useEffect } from 'react';
  import { Outlet, useNavigate } from 'react-router-dom';
  import './Main.css';

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
    }, []);

    return (
      <div className='Main'>
        {/* Top Bar */}
        <div className='top-bar'>
          <div className='title'>ADMIN</div>
          <div className='actions'>
          <form className="search-bar" onSubmit={(e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      console.log('Search Query:', query);
      // Add search logic here (e.g., API call or data filtering)
    }
  }}>
    <input 
      type="search" 
      name="search" 
      id="searchInput" 
      placeholder="Search..." 
      required 
    />
    <button className="search-btn" type="submit">
      <span>Search</span>
    </button>
  </form>

            <button className='notif-button'>Notifications</button>
            <button className='notif-button'>Profile</button>
          </div>
        </div>
        <div className='container'>
          
          <div className='navigation'>
          <div className='dashboard'>Dashboard</div>
            <ul>
              <li>
                <a href='/main/movies'>Movies</a>
              </li>
              <li>
                <a href='#'>User</a>
              </li>
              <li>
                <a href='#'>Analytics/Reports</a>
              </li>
              <li>
                <a href='#'>Settings</a>
              </li>
              <li className='logout'>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
          <div className='outlet'>
            <Outlet/>
          </div>
        </div>
      </div>
    );
  }

  export default Main;
