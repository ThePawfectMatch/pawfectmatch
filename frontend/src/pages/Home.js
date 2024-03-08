import { Link } from 'react-router-dom'
import '../styles/home.css'

 const Home = () => { 
  return (
    <div className='home-container'>
        <img className='logo-container' src={'/images/logo.png'} alt="Pawfect Match"/>
        <div className='home-button-container'>
            <Link to="/login">
                <button className='home-button'>Login</button>
            </Link>
            <Link to="/signup">
                <button className='home-button'>Sign Up</button>
            </Link>
        </div>
    </div>
  )
 }

export default Home