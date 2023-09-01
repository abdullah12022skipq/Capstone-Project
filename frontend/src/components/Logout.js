import { resetState } from '../redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    // Dispatch an action to reset the state to initial values
    dispatch(resetState());
    // Redirect to the login page
    navigate('/login', { replace: true });
  };

  return (
    <button
      className="flex items-center justify-center h-12 hover:bg-gray-100"
      onClick={handleLogout}
    >
      <FiLogOut className="text-xl mr-2" />
      <span className="hidden sm:block">Logout</span>
    </button>
  );
};

export default LogoutButton;
