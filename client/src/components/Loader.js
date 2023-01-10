import { Box, CircularProgress } from '@mui/material';

export const Loader = props => {
  return (
    <Box sx={{
      display: 'Flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: props.fullHeight ? '100vh' : '100%'
    }}>
      <CircularProgress />
    </Box>
  )
}
