import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Dropdown from "../components/Dropdown"

/* Dropdown menu question arrays */
const Q1 = [
  {label: 'Individual', value: 'individual'},
  {label: 'Organization', value: 'organization'}
]

const Q2 = [
  {label: 'House', value: 'house'},
  {label: 'Apartment', value: 'apartment'},
  {label: 'Homeless', value: 'loser'}
]

const Q3 = [
  {label: 'Happy', value: 'happy'},
  {label: 'Energetic', value: 'energetic'},
  {label: 'Lonely', value: 'lonely'}
]

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [zip, setZip] = useState('')
  const [bio, setBio] = useState('')

  const [userType, setUserType] = useState('')
  const [livingArrangements, setLivingArrangements] = useState('')
  const [lifestyleTraits, setLifestyleTraits] = useState([])

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* FIXME: update signup with required info */
    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      
      <h3>Username:</h3>
      <input 
        type="username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <h3>Password:</h3>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <h2>Contact Information</h2>
      <h3>First Name:</h3>
      <input 
        type="firstName" 
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName} 
      />
      <h3>Last Name:</h3>
      <input 
        type="lastName" 
        onChange={(e) => setLastName(e.target.value)}
        value={lastName} 
      />
      <h3>Email:</h3>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email} 
      />
      <h3>Phone Number:</h3>
      <input 
        type="number" 
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber} 
      />
      <h3>Zip Code:</h3>
      <input 
        type="number" 
        onChange={(e) => {setZip(e.target.value); console.log(lifestyleTraits)}}
        value={zip} 
      />

      <Dropdown question={"User Type:"} isMulti={false} options={Q1} onChange={(value) => setUserType(value.value)} />
      <Dropdown question={"Living Arrangements:"} isMulti={false} options={Q2} onChange={(value) => setLivingArrangements(value.value)} />
      <Dropdown question={"Lifestyle Traits (select all that apply):"} isMulti={true} options={Q3} onChange={(value) => console.log(value)} />

      <h3>Bio:</h3>
      <input 
        type="bio" 
        onChange={(e) => setBio(e.target.value)}
        value={bio} 
      />
      <div>
        <button disabled={isLoading}>Sign up</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup