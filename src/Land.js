import React from 'react'
import Featured from './comp/Featured'
import Hero from './comp/Hero'
import Navbar from './comp/Navbar'
import Signup from './comp/Signup'
import Footer from './comp/Footer'
import './Land.css';


function Land() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Signup />
      <Footer />
    </>
  );
}

export default Land;
