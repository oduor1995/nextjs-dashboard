'use client';
//import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  //const router = useRouter();

  useEffect(() => {
    // Redirect logic goes here
    window.location.href = '/login';
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <p>Welcome to Finserve Bulk-sms</p>
    </div>
  );
};

export default HomePage;
