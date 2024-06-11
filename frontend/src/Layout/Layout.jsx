import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldShowNavbar = !['/login', '/signup'].includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>{children}</main>
      <br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Layout;
