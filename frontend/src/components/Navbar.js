import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import '../styles/navbar.css'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [isActive, setIsActive] = useState(false);

  const handleUserMenu = () => {
    setIsActive(!isActive)
  }

  const handleLogout = () => {
    logout()
  }

  return (
      <div className="nav-container">
        <Link to="/main">
          <img className='main-logo-container' src={'/images/logo.png'} alt="Pawfect Match"/>
        </Link>
        <div className='nav-bar-buttons'>
          
          <div>
            <Link to="/likedpets" className='button-link'>
              <img className='liked-pets' src={"/images/liked_pets.png"} alt="Post A Pet"/>
            </Link>
          </div>

          <div>
            <Link to="/listing" className='button-link'>
              <img className='post-pet' src={"/images/post_pet.png"} alt="Post A Pet"/>
            </Link>
          </div>
          
          <div className={`main-acc-buttons ${isActive ? 'active' : ''}`}>
            <div className='pfp-container'>
            {(user && user.picPath === "") ? (
                <img className='pfp' onClick={handleUserMenu} src={user.picPath} alt="Default PFP"/>
                ) : (
                <img className='pfp' onClick={handleUserMenu} src={"/images/uploads/default_pfp.png"} alt="Default PFP"/>
            )}
            </div>

            <ul>
              <li className='edit' onClick={handleLogout}>Log Out</li>
                <Link to="/main" className='button-link'>
                  <li className='edit'>Edit Account</li>
                </Link>
                {/* <Link to="/likedpets" className='button-link'>
                  <li className='liked'>My Liked Pets</li>
                </Link> */}
                <Link to="/likedpets" className='button-link'>
                  <li className='liked'>My Listings</li>
                </Link>
              </ul>
            </div>

        </div>
      </div>
  )
}

export default Navbar

/* {(user && isActive) ? (
              <div className='main-acc-buttons'>
                 <button className='logout-button' onClick={handleLogout}>Log out</button>
                <span className='user-email'>{user.email}</span>
              </div>
              ) : (
              <div></div>
              )} */