'use client';

import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      throw new Error('test');
    }, 1000);
  }, []);

  return <div>Home</div>;
};

export default Home;
