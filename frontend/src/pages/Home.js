import { Link } from 'react-router-dom'
import '../styles/home.css'
import React, { useState } from 'react'

 const Home = () => { 

    const [isActive, setIsActive] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
  
    const handleMouseEnter = () => {
        if (!isChanging) {
            setIsChanging(true);
            setIsActive(!isActive);
          setTimeout(() => {
            setIsChanging(false);
          }, 300);
        }
    };

  return (
    <body className='home-body'>
        <div className='home-container'>
            <img className='logo-container' onClick={handleMouseEnter} src={'/images/logo.png'} alt="Pawfect Match"/>
            <div className='home-button-container'>
                <Link to="/login">
                    <button className='home-button' >Login</button>
                </Link>
                <Link to="/signup">
                    <button className='home-button' >Sign Up</button>
                </Link>
            </div>
        </div>
        <img className={`slide-dog ${isActive ? 'active' : 'inactive'}`} src={'/images/puppy_peeking1.png'} alt="puppy_peeking1"/>
    </body>
  )
 }

export default Home