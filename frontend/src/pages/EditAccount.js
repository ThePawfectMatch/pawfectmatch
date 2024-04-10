import { useState } from "react"
import Dropdown from "../components/Dropdown"
import '../styles/editaccount.css'
import { useAuthContext } from "../hooks/useAuthContext"
import {userVals, homeVals, lifestyleVals, petprefVals, expVals, spaceVals} from '../const/editConst'


// components
import Navbar from '../components/Navbar'

const EditAccount = () => {
  const {user} = useAuthContext()
  
  const initializeCells = async () => {
    try {
      const response = await fetch('/api/user/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {

      }

      if (!response.ok) {

      }
    }
  
    catch (e) {
  
    }
  }

  initializeCells()

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

  const handleSubmit = () => {
    
  }


  return (
    <div>
        <Navbar />
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
              value={'YOUR EMAIL HERE'} 
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
            <Dropdown question={"User Type*"} isMulti={false} options={userVals} onChange={(value) => setUserType(value)} />
            <Dropdown question={"Pet Preferences"} isMulti={true} options={petprefVals} onChange={(value) => setPetPreferences(value)} />
            <Dropdown question={"Experience with Pets"} isMulti={false} options={expVals} onChange={(value) => setExperience(value)} />
            <Dropdown question={"Lifestyle"} isMulti={true} options={lifestyleVals} onChange={(value) => setLifestyleTraits(value)} />
          </div>

          <div className="editaccount-dropdowns">
            <Dropdown question={"Living Arrangements"} isMulti={false} options={homeVals} onChange={(value) => setLivingArrangements(value)} />
            <Dropdown question={"Available Space"} isMulti={true} options={spaceVals} onChange={(value) => setSpace(value)} />
          </div>

          <h2 className="editaccount-header2">Bio</h2>
          <textarea className="editaccount-bio"
            type="bio" 
            onChange={(e) => setBio(e.target.value)}
            value={bio} 
          />

          {/* MAKE ANOTHER PROTECTED API ROUTE FOR THIS ONE
          <div>
            <button className="gen-bio-button" type="button" onClick={genBio}>Generate Bio</button>
          </div>
          */}
          <div>
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