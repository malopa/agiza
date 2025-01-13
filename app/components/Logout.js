// components/Logout.js
"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import { removeToken } from '../utils/retrieveToken';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = () => {
  const { setRefresh } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setRefresh(null);
    removeToken()
    router.push('/');
  };

  return (
    <button onClick={handleLogout} className='flex text-red-500'>
      <LogoutOutlined  className='mr-2'/> Logout 
    </button>
  );
};

export default Logout;
