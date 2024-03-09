import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("hi this is supposed to be submitting")

    await login(email, password)
  }

  return (
    <div className='login-container'>
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login-header">Log In</h1>
        
        <div className="login-field">
          <label className="login-info">Email address</label>
          <input className="login-input"
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <label className="login-info">Password</label>
          <input className="login-input"
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className='login-button' disabled={isLoading}>Log In</button>

      </form>
    </div>
  )
}

export default Login