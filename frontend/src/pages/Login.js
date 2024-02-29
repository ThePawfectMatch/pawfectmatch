import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        //console.log(username, password)
        console.log("Running")
    }
    // come back to log in button
    return (
        <div className="loginbox">
            <form className='login' onSubmit={handleSubmit}>
                <h3>Log in</h3>
                <div>
                <label>Username:</label>
                <input 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                </div>
                
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                    />
                </div>
                <button>Log in</button> {/* Come back to later about linking to main page */} 
            </form>
        </div>
        
    )
}

export default Login