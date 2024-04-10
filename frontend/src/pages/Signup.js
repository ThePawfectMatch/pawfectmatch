import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Dropdown from "../components/Dropdown"
import '../styles/signup.css'
import {userVals, homeVals, lifestyleVals, petprefVals, expVals, spaceVals} from '../const/signupConst'


const Signup = () => {
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [zip, setZip] = useState('')
  const [bio, setBio] = useState('')
  const [file, setFile] = useState(null)
  var picPath = ''

  const [emptyFields, setEmptyFields] = useState([])

  /* Dropdown questions return object with label and value */
  const [userType, setUserType] = useState()
  const [livingArrangements, setLivingArrangements] = useState()
  const [lifestyleTraits, setLifestyleTraits] = useState() /* multi dropdown returns array of objects */
  const [petPreferences, setPetPreferences] = useState()
  const [experience, setExperience] = useState()
  const [space, setSpace] = useState()

  const {signup, isLoading, error } = useSignup()

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setFile(e.target.files[0])
    console.log(file)
  };

  const checkFields = () => {
    let emptyFields = []
    if (!email) {
      emptyFields.push('email')
    }
    if (!password) {
      emptyFields.push('password')
    }
    if (!firstName) {
      emptyFields.push('firstName')
    }
    if (!lastName) {
      emptyFields.push('lastName')
    }
    if (!phoneNumber) {
      emptyFields.push('phoneNumber')
    }
    if (!zip) {
      emptyFields.push('zipcode')
    }
    if (!userType) {
      emptyFields.push('accountType')
    }
    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields)
      throw Error("All fields must be filled")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* FIXME: update signup with required info */
    /* will have to breakdown dropdown objects to access info e.g. -> userType?.value */
    try {
      checkFields()
      await handleUpload() /* upload photo upon submit. NOTE: CHANGE LATER TO UPDATE USER PIC IF ACCOUNT IS GOOD (this way we have problem where a pic can be uploaded if the email exists already. ) */
      await signup(email, password, picPath, firstName, lastName, phoneNumber, 
        zip, bio, userType, livingArrangements, lifestyleTraits, petPreferences, experience, space)
    }
    catch (error) {
      console.log(`Error signing up: ${error}`)
      // later note, we may be able to use the catch blocks to do the CSS styling of if there's an error
      // and add the red outline to the empty fields
    }
  }

  const handleUpload = async () => {
    // e.preventDefault() // causes error when called from handle submit
    
    if (!file) {
      console.log("No PFP")
    }
    else {
      const formData = new FormData()
      formData.append('file', file)
        const response = await fetch('/api/upload/user', {
          method: 'POST',
          body: formData
      })
      const json = await response.json()
      if (response.ok) {
        picPath = json.path
      }
      if (!response.ok) {
        throw Error(`Error uploading. ${response.error}`)
      }
    }
  }

  const genBio = async () => {
    try {
      checkFields()
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
          setBio(json.bio)
      }
      if (!response.ok) {
          throw Error(response.error)
      }
    }
    catch (error) {
      console.log(`Error generating bio: ${error}`)
    }
  }

  return (
    <div className="signup-border">
    <div className='signup-container'>
    <form className="signup" onSubmit={handleSubmit}>
      <h1 className="signup-header">Sign Up</h1>
      <div className="signup-disclaim">
      <label>Required info indicated with *</label>
      </div>
    
      <div className="signup-required-info">

      <div className="signup-question">
        <label className="signup-info">Email*</label>
        <input className="signup-input"
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Password*</label>
        <input className="signup-input"
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </div>

      <div className="signup-pfp">
      {(previewUrl === null) ? (
          <img className='pfp' src={"/images/uploads/default_pfp.png"} alt="Default PFP"/>
        ) : (
          <img className='pfp' src={previewUrl} alt="PFP"/>
        ) }
      
        {/* <label className="signup-info">Upload Profile Picture</label> */}
        <input
          className="file-upload"
          id="file-upload"
          type="file" 
          onChange={handleFileInputChange}
        />
        <button className="file-upload-button" type="button">
        <label for="file-upload" className="file-upload-label">Upload Profile Picture</label>
        </button>
        {/* <button type="button" onClick={handleUpload}>Upload</button>*/} 
      </div>
      </div>
      

      <h2 className="signup-header2">Contact Information</h2>
      <div className="signup-contact-info">

      <div className="signup-question">
        <label className="signup-info">First Name*</label>
        <input className="signup-input2"
          type="firstName" 
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Last Name*</label>
        <input className="signup-input2"
          type="lastName" 
          onChange={(e) => setLastName(e.target.value)}
          value={lastName} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Phone Number*</label>
        <input className="signup-input2"
          type="number" 
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber} 
        />
      </div>

      <div className="signup-question">
        <label className="signup-info">Zip Code*</label>
        <input className="signup-input2"
          type="number" 
          onChange={(e) => setZip(e.target.value)}
          value={zip} 
        />
      </div>
      </div>

      <h2 className="signup-header2">Additional Information</h2>
      <div className="signup-dropdowns">
        <Dropdown question={"User Type*"} isMulti={false} options={userVals} onChange={(value) => setUserType(value)} />
        <Dropdown question={"Pet Preferences"} isMulti={true} options={petprefVals} onChange={(value) => setPetPreferences(value)} />
        <Dropdown question={"Experience with Pets"} isMulti={false} options={expVals} onChange={(value) => setExperience(value)} />
        <Dropdown question={"Lifestyle"} isMulti={true} options={lifestyleVals} onChange={(value) => setLifestyleTraits(value)} />
      </div>

      <div className="signup-dropdowns">
        <Dropdown question={"Living Arrangements"} isMulti={false} options={homeVals} onChange={(value) => setLivingArrangements(value)} />
        <Dropdown question={"Available Space"} isMulti={true} options={spaceVals} onChange={(value) => setSpace(value)} />
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

      {error && <div className="error">*** {error} ***</div>}
      
    </form>
    </div>
    </div>
  )
}

export default Signup