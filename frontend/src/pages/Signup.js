import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Dropdown from "../components/Dropdown"
import '../styles/signup.css'

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
    console.log('Sending request to generate Bio')
    const lifestyleTraitValues = lifestyleTraits?.map(trait => trait.value)
    const petPreferencesValues = petPreferences?.map(preference => preference.value)
    const livingArrangementsValue = livingArrangements?.value
    const u = {firstName, lastName, livingArrangementsValue, lifestyleTraitValues, petPreferencesValues}

    const response = await fetch('/api/openai/user-bio', {
        method: 'POST',
        body: JSON.stringify(u),
        headers: {
          'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if (response.ok) {
        // console.log(json.bio)
        setBio(json.bio)
    }
    if (!response.ok) {
        console.log(response.error)
    }
  }

  return (
    <div className="signup-border">
    <div className='signup-container'>
    <form className="signup" onSubmit={handleSubmit}>
      <h1 className="signup-header">Sign Up</h1>
      <div className="signup-required-info">

      <div className="signup-question">
        <label className="signup-info">Email</label>
        <input className="signup-input"
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Password</label>
        <input className="signup-input"
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Upload a Profile Picture</label>
        <input
          className="file-upload"
          id="file-upload"
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label for="file-upload" class="file-upload-label">Choose File</label>
        <button type="button" onClick={handleUpload}>Upload</button>
      </div>
      </div>

      <h2 className="signup-header2">Contact Information</h2>
      <div className="signup-contact-info">

      <div className="signup-question">
        <label className="signup-info">First Name</label>
        <input className="signup-input2"
          type="firstName" 
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Last Name</label>
        <input className="signup-input2"
          type="lastName" 
          onChange={(e) => setLastName(e.target.value)}
          value={lastName} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Phone Number</label>
        <input className="signup-input2"
          type="number" 
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Zip Code</label>
        <input className="signup-input2"
          type="number" 
          onChange={(e) => setZip(e.target.value)}
          value={zip} 
        />
      </div>
      </div>

      <h2 className="signup-header2">Additional Information</h2>
      <div className="signup-dropdowns">
        <Dropdown question={"User Type"} isMulti={false} options={Q1} onChange={(value) => setUserType(value)} />
        <Dropdown question={"Living Arrangements"} isMulti={false} options={Q2} onChange={(value) => setLivingArrangements(value)} />
        <Dropdown question={"Lifestyle Traits"} isMulti={true} options={Q3} onChange={(value) => setLifestyleTraits(value)} />
        <Dropdown question={"Pet Preferences"} isMulti={true} options={Q4} onChange={(value) => setPetPreferences(value)} />
      </div>

      <h2 className="signup-header2">Bio</h2>
      <textarea className="signup-bio"
        type="bio" 
        onChange={(e) => setBio(e.target.value)}
        value={bio} 
      />

      {/* ADD API CALL TO THIS BUTTON*/}
      <div>
        <button className="gen-bio-button" type="button" onClick={genBio}>Generate Bio</button>
      </div>
      <div>
        <button className="signup-button" disabled={isLoading}>Sign Up</button>
      </div>

      {error && <div className="error">{error}</div>}
      
    </form>
    </div>
    </div>
  )
}

export default Signup