import { useState, useEffect } from "react"
import Dropdown from "../components/Dropdown"
import '../styles/editaccount.css'
import { useAuthContext } from "../hooks/useAuthContext"
import {userVals, homeVals, lifestyleVals, petprefVals, expVals, spaceVals} from '../const/editConst'


// components
import Navbar from '../components/Navbar'

const EditAccount = () => {
  const {user} = useAuthContext()
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

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const initializeCells = async () => {
        const response = await fetch('/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
  
        if (response.ok) {
          console.log(json)
          json.user.email && setEmail(json.user.email)
          json.user.firstName && setFirstName(json.user.firstName)
          json.user.lastName && setLastName(json.user.lastName)
          json.user.phoneNumber && setPhoneNumber(json.user.phoneNumber)
          json.user.zipcode && setZip(json.user.zipcode)
          json.user.accountType && setUserType(json.user.accountType)
          json.user.petPreferences && setPetPreferences(json.user.petPreferences)
          json.user.lifestyleTraits && setLifestyleTraits(json.user.lifestyleTraits)
          json.user.livingArrangements && setLivingArrangements(json.user.livingArrangements)
          json.user.experience && setExperience(json.user.experience)
          json.user.space && setSpace(json.user.space)
          picPath = json.user.picPath
          setPreviewUrl(json.user.picPath)
          json.user.bio && setBio(json.user.bio)
        }
  
        if (!response.ok) {
          console.log('ermmm what the flip')
        }
    }

    initializeCells()
  }, [user])

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

  const [formSubmitted, setFormSubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      checkFields()
      await handleUpload() /* upload photo upon submit. NOTE: CHANGE LATER TO UPDATE USER PIC IF ACCOUNT IS GOOD (this way we have problem where a pic can be uploaded if the email exists already. ) */
      const userInfo = {picPath, firstName, lastName, phoneNumber, 
        zipcode: zip, bio, accountType: userType, livingArrangements, lifestyleTraits, petPreferences, experience, space}
      const response = await fetch('/api/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userInfo)
      })
      const json = await response.json()
      if (response.ok) {
        console.log(json.user)
      }
      if (!response.ok) {
        console.log('update user unsuccessful')
      }
    }
    catch (error) {
      console.log(`Error updating information: ${error}`)
      // later note, we may be able to use the catch blocks to do the CSS styling of if there's an error
      // and add the red outline to the empty fields
    }
    setFormSubmitted(true)
  }

  const handleUpload = async () => {    
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

  useEffect(() => {
    // Schedule a callback to set isVisible to false after 3000 milliseconds (3 seconds)
    const timeoutId = setTimeout(() => {
      setFormSubmitted(false);
    }, 2000);

    // Cleanup function to clear the timeout when the component unmounts or when the dependency changes
    return () => clearTimeout(timeoutId);
  }, [formSubmitted]);

  return (
    <div>
        <Navbar />
        <div className={`update-popup ${formSubmitted ? 'visible' : ''}`}>Account Information Updated!</div>
        <div className="editaccount-account">
        <div className="editaccount-border">
        <div className='editaccount-container'>
        <form className="editaccount" onSubmit={handleSubmit}>
          <h1 className="editaccount-header">Edit Account</h1>
          <div className="editaccount-disclaim">
          <label>Required info indicated with *</label>
          </div>
        
          <div className="editaccount-required-info">

          <div className="editaccount-question">
            <label className="editaccount-info" >Email*</label>
            <input className="editaccount-input"
              type="email" 
              value={email} 
              disabled
            />
          </div>

          <div className="editaccount-question">
            <label className="editaccount-info" >Password*</label>
            <input className="editaccount-input"
              type="password" 
              value={`********`} 
              disabled
            />
          </div>

          <div className="editaccount-pfp">
          {(previewUrl === null) ? (
              <img className='pfp' src={"/images/uploads/default_pfp.png"} alt="Default PFP"/>
            ) : (
              <img className='pfp' src={previewUrl} alt="PFP"/>
            ) }
          
            {/* <label className="editaccount-info">Upload Profile Picture</label> */}
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
          

          <h2 className="editaccount-header2">Contact Information</h2>
          <div className="editaccount-contact-info">

          <div className="editaccount-question">
            <label className="editaccount-info">First Name*</label>
            <input className="editaccount-input2"
              type="firstName" 
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName} 
            />
          </div>

          <div className="editaccount-question">
            <label className="editaccount-info">Last Name*</label>
            <input className="editaccount-input2"
              type="lastName" 
              onChange={(e) => setLastName(e.target.value)}
              value={lastName} 
            />
          </div>

          <div className="editaccount-question">
            <label className="editaccount-info">Phone Number*</label>
            <input className="editaccount-input2"
              type="number" 
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber} 
            />
          </div>

          <div className="editaccount-question">
            <label className="editaccount-info">Zip Code*</label>
            <input className="editaccount-input2"
              type="number" 
              onChange={(e) => setZip(e.target.value)}
              value={zip} 
            />
          </div>
          </div>

          <h2 className="editaccount-header2">Additional Information</h2>
          <div className="editaccount-dropdowns">
            <Dropdown question={"User Type*"} isMulti={false} value={userType} options={userVals} onChange={(value) => setUserType(value)} />
            <Dropdown question={"Pet Preferences"} isMulti={true} value={petPreferences} options={petprefVals} onChange={(value) => setPetPreferences(value)} />
            <Dropdown question={"Experience with Pets"} isMulti={false} value={experience} options={expVals} onChange={(value) => setExperience(value)} />
            <Dropdown question={"Lifestyle"} isMulti={true} value={lifestyleTraits} options={lifestyleVals} onChange={(value) => setLifestyleTraits(value)} />
          </div>

          <div className="editaccount-dropdowns">
            <Dropdown question={"Living Arrangements"} value={livingArrangements} isMulti={false} options={homeVals} onChange={(value) => setLivingArrangements(value)} />
            <Dropdown question={"Available Space"} value={space} isMulti={true} options={spaceVals} onChange={(value) => setSpace(value)} />
          </div>

          <h2 className="editaccount-header2">Bio</h2>
          <textarea className="editaccount-bio"
            type="bio" 
            onChange={(e) => setBio(e.target.value)}
            value={bio} 
          />

          {/* MAKE ANOTHER PROTECTED API ROUTE FOR THIS ONE
          <div>
            <button className="gen-bio-button" type="button" onClick={handleGenBio}>Generate Bio</button>
          </div>
          */}
          <div className="page-bottom">
            <button className="editaccount-button" /*disabled={isLoading}*/>Update Information</button>          
          </div>

          {/*error && <div className="error">*** {error} ***</div>*/}
          
        </form>
        
        </div>
        </div>
            </div>
    </div>
  )
}

export default EditAccount