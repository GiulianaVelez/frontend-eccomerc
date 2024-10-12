import React from 'react';

const ContainerPrincipal= ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  );
};

export default ContainerPrincipal;