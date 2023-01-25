import { useState, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../utils/authUtils';
import { Loader } from '../components/Loader';
import { Container, Box } from '@mui/material';
import assets from '../assets';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoader(false);
      } else {
        navigate('/');
      }
    }
    checkAuth();
  }, [navigate])
  
  return (
    loader ? ( <Loader fullHeight /> ) : (
      <Container component='main' maxWidth='xs'>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src={assets.img.logoDark} style={{width: '200px'}} alt='logo'/> 
          <Outlet />
        </Box>
      </Container> 
    )
  )
}
