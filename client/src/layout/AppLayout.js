import { useState, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../utils/authUtils';
import { Loader } from '../components/Loader';
import { Box } from '@mui/material';
import second, { Sidebar } from '../components/Sidebar'



export const AppLayout = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        setLoader(false);
      }
    }
    checkAuth();
  }, [navigate])
  
  return (
    loader ? <Loader fullHeight /> : 
      <Box sx={{
        display:'flex'
      }}>
        <Sidebar />
        <Box sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content'
        }}>
          <Outlet />
        </Box>
      </Box>
      
    
  )
}
