import { Link } from 'react-router-dom'
import '../styles/home.css'
import React, { useState } from 'react'

 const Home = () => { 

    const [isActive, setIsActive] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const handleAnimation = () => {
        if (!isChanging) {
            setIsChanging(true);
            setIsActive(!isActive);
            setIsReversed(false);
          setTimeout(() => {
            setIsChanging(false);
          }, 300);
        }
    };

    const handleReverseAnimation = () => {
        if (!isChanging) {
            setIsChanging(true);
            setIsActive(!isActive);
            setIsReversed(true);
          setTimeout(() => {
            setIsChanging(false);
          }, 300);
        }
    };

  return (
    <body className='home-body'>
        <div className='home-container'>
            <img className='logo-container' onClick={isActive ? handleReverseAnimation : handleAnimation} src={'/images/logo.png'} alt="Pawfect Match"/>
            <div className='home-button-container'>
                <Link to="/login">
                    <button className='home-button' >Login</button>
                </Link>
                <Link to="/signup">
                    <button className='home-button' >Sign Up</button>
                </Link>
            </div>
        </div>
        <img className={`slide-dog ${isActive ? 'active' : ''} ${isReversed ? 'reverse' : ''}`} src={'/images/puppy_peeking1.png'} alt="puppy_peeking1"/>
    </body>
  )
 }

export default Home