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

const Q4 = [
  {label: 'Dog', value: 'dog'},
  {label: 'Cat', value: 'cat'},
  {label: 'Gator', value: 'gator'}
]

const Signup = () => {
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [zip, setZip] = useState('')
  const [bio, setBio] = useState('')
  const [file, setFile] = useState(null)
  const [picPath, setPicPath] = useState('')

  /* Dropdown questions return object with label and value */
  const [userType, setUserType] = useState()
  const [livingArrangements, setLivingArrangements] = useState()
  const [lifestyleTraits, setLifestyleTraits] = useState() /* multi dropdown returns array of objects */
  const [petPreferences, setPetPreferences] = useState()

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* FIXME: update signup with required info */
    /* will have to breakdown dropdown objects to access info e.g. -> userType.value */
    const lifestyleTraitValues = lifestyleTraits?.map(trait => trait.value)
    const petPreferencesValues = petPreferences?.map(preference => preference.value)
    console.log(picPath)
    await signup(email, password, picPath, firstName, lastName, phoneNumber, 
      zip, bio, userType?.value, livingArrangements?.value, lifestyleTraitValues, petPreferencesValues)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!file) {
      throw Error('Please select a file first')
    }

    const formData = new FormData()
    formData.append('file', file)

      const response = await fetch('/api/upload/user', {
        method: 'POST',
        body: formData
    })
    const json = await response.json()
    if (response.ok) {
      setPicPath(json.path) 
      console.log('File uploaded successfully to', json.path)
    }
    if (!response.ok) {
      console.log('Error uploading file')
    }
  }

  const genBio = async () => {

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      
      <h3>Email:</h3>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email} 
      />
      <h3>Password:</h3>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <h3>Upload a Profile Picture:</h3>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="button" onClick={handleUpload}>Upload</button>

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
      <h3>Phone Number:</h3>
      <input 
        type="number" 
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber} 
      />
      <h3>Zip Code:</h3>
      <input 
        type="number" 
        onChange={(e) => setZip(e.target.value)}
        value={zip} 
      />

      <Dropdown question={"User Type:"} isMulti={false} options={Q1} onChange={(value) => setUserType(value)} />
      <Dropdown question={"Living Arrangements:"} isMulti={false} options={Q2} onChange={(value) => setLivingArrangements(value)} />
      <Dropdown question={"Lifestyle Traits (select all that apply):"} isMulti={true} options={Q3} onChange={(value) => setLifestyleTraits(value)} />
      <Dropdown question={"Pet Preferences (select all that apply):"} isMulti={true} options={Q4} onChange={(value) => setPetPreferences(value)} />

      <h3>Bio:</h3>
      <input 
        type="bio" 
        onChange={(e) => setBio(e.target.value)}
        value={bio} 
      />
      {/* ADD API CALL TO THIS BUTTON*/}
      <div>
        <button type="button" onClick={genBio}>Generate Bio</button>
      </div>
      <div>
        <button disabled={isLoading}>Sign up</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup