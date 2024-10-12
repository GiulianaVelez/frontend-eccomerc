import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsappIcono = () => {
  return (
    <a 
      href="https://wa.me/3571572918" 
      className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg"
    >
      <WhatsAppIcon style={{ color: 'white', fontSize: '40px' }} />
    </a>
  );
};

export default WhatsappIcono;