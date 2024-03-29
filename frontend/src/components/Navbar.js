import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../styles/navbar.css'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="nav-container">
        <Link to="/main">
          <img className='main-logo-container' src={'/images/logo.png'} alt="Pawfect Match"/>
        </Link>
        <div className='nav-bar-buttons'>
          <div className="listing-button-container">
              <Link to="/listing">
                <button className='listing-button'>Post a Pet</button>
              </Link>
          </div>
          {/* create liked pets page and link */}
          <div className='liked-pets-button-container'>
          <Link to="/likedpets">
            <button className='liked-pets-button'>Liked Pets</button>
            </Link>
          </div>
          {user &&(
            <div className='main-acc-buttons'>
              {/* replace with just profile pic */}
              <button className='logout-button' onClick={handleClick}>Log out</button>
              <span className='user-email'>{user.email}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
