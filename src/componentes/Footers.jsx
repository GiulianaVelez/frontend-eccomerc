import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';


const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#F9C2D5', p: 4, marginTop: 'auto', color: '#4B2C5A' }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center">
          
          <img 
            src="https://th.bing.com/th/id/OIP.NSMFPFYHBFbN6r7futOCEwHaHa?rs=1&pid=ImgDetMain" 
            alt="Logo" 
            className="w-32 h-32 mb-4 rounded-full" 
          />

          
          <Box display="flex" justifyContent="space-around" width="100%" flexWrap="wrap">
           
            <Box mb={2} textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Ayuda</Typography>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Comprar</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68C5A' } }}>Resolución de problemas</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Reclamos</Link>
            </Box>

            
            <Box mb={2} textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Redes Sociales</Typography>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Facebook</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Instagram</Link>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>YouTube</Link>
            </Box>

            
            <Box mb={2} textAlign="center">
              <Typography variant="h6" sx={{ color: '#4B2C5A', fontWeight: 'bold' }}>Mi Cuenta</Typography>
              <Link href="#" color="inherit" sx={{ display: 'block', color: '#4B2C5A', '&:hover': { textDecoration: 'underline', color: '#C68CBA' } }}>Ingresá</Link>
              
            </Box>
          </Box>

          < Box mt={4}>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2, color: '#4B2C5A' }}>
              © 2024 Bella Chic. Todos los derechos reservados.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
