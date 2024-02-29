import { Link } from 'react-router-dom'
//import { useLogout } from '../hooks/userLogut'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }


    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>PawfectMatch</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar