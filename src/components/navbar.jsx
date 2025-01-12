import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useAuth } from '../context/useAuth';
import Search from './search';
import BtnOutline from './btnOutline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const links = [
    { name: 'Home', url: '/' },
    { name: 'Information', url: '/about' },
    { name: 'Feedback', url: '/contact' },
    user?.role === 'creator' && { name: 'My Videos', url: '/creator/my-videos' },
    user?.role === 'creator' && { name: 'Upload', url: '/creator/upload-video' },
  ].filter(Boolean);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogin = () => navigate('/login');
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-24 bg-gradient-to-r from-indigo-900 via-purple-700 to-indigo-900 shadow-lg backdrop-blur-md text-white rounded-b-lg">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        
          <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text">
            TIKTAK
          </h1>
        </div>

        {/* Links for Desktop */}
        <div className="hidden lg:flex gap-8">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.url)}
              className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === link.url
                  ? 'bg-gradient-to-r from-yellow-400 to-pink-400 text-black shadow-md'
                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-400 hover:text-black hover:shadow-md'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Search and User */}
        <div className="hidden lg:flex items-center gap-5">
          <Search />
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDropdownToggle}
                aria-haspopup="menu"
              >
                <IoPersonSharp className="text-3xl" />
                <span className="text-lg font-medium">{user.username}</span>
                <RiArrowDownSFill size={25} />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 bg-white text-black shadow-lg rounded-lg overflow-hidden z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-6 py-2 w-full text-left hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <BtnOutline
              text="Login"
              css="bg-gradient-to-r from-yellow-400 to-pink-400 text-black hover:from-yellow-500 hover:to-pink-500 shadow-md"
              handleClick={handleLogin}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-2xl text-white" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white fixed inset-0 z-20 flex flex-col items-center gap-6 pt-20 backdrop-blur-lg">
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(link.url);
                setSidebarOpen(false);
              }}
              className={`text-lg font-medium px-4 py-2 rounded-md transition-all ${
                pathname === link.url
                  ? 'bg-gradient-to-r from-yellow-400 to-pink-400 text-black shadow-md'
                  : 'hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-400 hover:text-black hover:shadow-md'
              }`}
            >
              {link.name}
            </button>
          ))}
          <Search />
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg font-medium px-6 py-3 rounded-md bg-red-600 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-400 hover:text-black shadow-md"
            >
              Logout
            </button>
          ) : (
            <BtnOutline
              text="Login"
              css="bg-gradient-to-r from-yellow-400 to-pink-400 text-black hover:from-yellow-500 hover:to-pink-500 shadow-md"
              handleClick={() => {
                handleLogin();
                setSidebarOpen(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
