import { Link } from "react-router-dom";
import '../styles/home.css'

const Home = () => {
    
    
    return (
        <div className="homewrapper">
            <h1 className="logo">PawfectMatch</h1>
            <div className="homebuttons">
                <Link to="/signup">
                    <button className="toSignup">Sign up</button>
                </Link>
                <Link to="/login">
                    <button className="toLogin">Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;