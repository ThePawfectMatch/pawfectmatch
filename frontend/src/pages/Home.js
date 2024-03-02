import { Link } from 'react-router-dom'

 const Home = () => { 
  return (
    <div>
        <img src={'/images/logo_draft.png'} alt="Pawfect Match"/>
        <div>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    </div>
  )
 }

export default Home