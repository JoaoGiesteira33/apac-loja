import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      <p>This is a simple example of a Home component.</p>
      <Button onClick={() => navigate('/product')}>Product</Button>
    </div>
  );
};

export default Home;
