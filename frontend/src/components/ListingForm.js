import { useState } from "react"
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Dropdown from "../components/Dropdown"
import '../styles/listing.css'

const ListingForm = () => {
  const { dispatch } = useListingsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [files, setFiles] = useState(null)
  const [traits, setTraits] = useState()
  const [bio, setBio] = useState('')
  const [picPaths, setPicPaths] = useState('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const traitOptions = [
    {label: 'Happy', value: 'happy'},
    {label: 'Energetic', value: 'energetic'},
    {label: 'Lonely', value: 'lonely'}
  ]
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in')
      return
    }
    const traitValues = traits?.map(trait => trait.value)
    const listing = {name, type, picPaths, breed, traitValues, bio}
    console.log(listing)

    const response = await fetch('/api/listings', {
      method: 'POST',
      body: JSON.stringify(listing),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setType('')
      setBreed('')
      setBio('')
      setError(null)
      setEmptyFields([])
      console.log('new listing added', json)
      dispatch({type: 'CREATE_LISTING', payload: json})
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!files) {
      throw Error('Please select a file first')
    }

    const formData = new FormData()
    formData.append('files', files)

      const response = await fetch('/api/upload/listing', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()
    if (response.ok) {
      setPicPaths(json.path) 
      console.log('File uploaded successfully to', json.path)
    }
    if (!response.ok) {
      console.log('Error uploading file')
    }
  }

  const genBio = async () => {
      console.log('Sending request to generate Bio')
      const traitValues = traits?.map(trait => trait.value)
      const l = {path: picPaths, name, type, breed, traitValues}

      console.log(l)

      const response = await fetch('/api/openai/listing-bio', {
        method: 'POST',
        body: JSON.stringify(l),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (response.ok) {
        console.log(json.bio)
        setBio(json.bio)
      }
      if (!response.ok) {
        console.log(response.error)
      }
  }

  return (
    <div className="listing-border">
    <div className='listing-container'>
    <form className="create" onSubmit={handleSubmit}>
      <h1 className="listing-header">Post a Pet</h1>

      <div className="listing-question">
        <label className="listing-info">Upload a Profile Picture</label>
        <input
          className="file-upload"
          id="file-upload"
          type="file" 
          onChange={(e) => setFiles(e.target.files[0])} // later will need to change to accommodate 2+ pics
        />
        <label for="file-upload" class="file-upload-label">Choose File</label>
        <button type="button" onClick={handleUpload}>Upload</button>
      </div>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Type:</label>
      <input 
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
        className={emptyFields.includes('type') ? 'error' : ''}
      />

      <label>Breed:</label>
      <input 
        type="text"
        onChange={(e) => setBreed(e.target.value)}
        value={breed}
        className={emptyFields.includes('breed') ? 'error' : ''}
      />

      <Dropdown question={"Traits"} isMulti={true} options={traitOptions} onChange={(value) => setTraits(value)} />

      <label>Bio</label>
      <textarea className="listing-bio"
        type="bio" 
        onChange={(e) => setBio(e.target.value)}
        value={bio} 
      />

      {/* ADD API CALL TO THIS BUTTON*/}
      <div>
        <button className="gen-bio-button" type="button" onClick={genBio}>Generate Bio</button>
      </div>

      <button>Add Listing</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
  )
}

export default ListingForm