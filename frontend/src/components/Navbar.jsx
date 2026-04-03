import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <NavLink to="/" className="logo">
          TaskApp
        </NavLink>
        <ul className="nav-links">
          {token ? (
            <>
              <li className="nav-greeting">Hi, {user.name}</li>
              <li>
                <button className="btn-logout" onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => (isActive ? 'btn-primary' : 'nav-link')}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => (isActive ? 'btn-primary' : 'nav-link')}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
