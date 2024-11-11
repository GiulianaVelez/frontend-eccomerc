import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#F9C2D5', p: 4, marginTop: 'auto', color: '#4B2C5A' }}>
      <Container maxWidth="lg">
        
        
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" width="100%">
          
         
          <Box>
            <img 
              src="https://th.bing.com/th/id/OIP.NSMFPFYHBFbN6r7futOCEwHaHa?rs=1&pid=ImgDetMain" 
              alt="Logo" 
              className="w-32 h-32 mb-4 rounded-full" 
            />
          </Box>

          
          <Box display="flex" flex="1" justifyContent="space-around" ml={3}>
           
            
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Ayuda</Typography>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Comprar</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Resolución de problemas</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Reclamos</Link>
            </Box>

            
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Redes Sociales</Typography>
              <Box display="flex" justifyContent="center">
                <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mx: 1 }}>
                  <FaFacebookF size={30} /> 
                </Link>
                <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mx: 1 }}>
                  <FaInstagram size={30} /> 
                </Link>
                <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mx: 1 }}>
                  <FaYoutube size={30} /> 
                </Link>
              </Box>
            </Box>

            
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Mi Cuenta</Typography>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Ingresá</Link>
            </Box>
          </Box>
        </Box>

        
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ color: '#4B2C5A' }}>
            © 2024 Bella Chic. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
