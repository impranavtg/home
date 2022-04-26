import React from 'react'
import Featured from './comp/Featured'
import Hero from './comp/Hero'
import Signup from './comp/Signup'
import Footer from './comp/Footer'
import './Land.css';
import Form from './comp/Form'


function Land() {
  return (
    <>
      <Hero />
      <Featured />
      <Signup />
//       <Form/>
      <Footer />
    </>
  );
}

export default Land;
