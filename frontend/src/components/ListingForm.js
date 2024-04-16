import { useState } from "react"
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Dropdown from "../components/Dropdown"
import '../styles/listing.css'
import {animalTypes, hypo, sizeVals, ageVals, energyVals, temperVals, trainingVals} from '../const/listingConst'

const ListingForm = () => {
  const { dispatch } = useListingsContext()
  const { user } = useAuthContext()

  // fill in the blank variables
  const [name, setName] = useState('')
  // const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [files, setFiles] = useState(null)
  const [bio, setBio] = useState('')
  const [picPaths, setPicPaths] = useState('')
  const [weight, setWeight] = useState('')

  const [error, setError] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // Dropdown question variables
  const [type, setType] = useState('')
  const [hypoallergenic, setHypo] = useState()
  const [age, setAge] = useState()
  const [size, setSize] = useState()
  const [energy, setEnergy] = useState()
  const [traits, setTraits] = useState()
  const [training, setTraining] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const traitValues = traits?.map(trait => trait.value)
    const hypoVal = hypoallergenic?.value
    const ageVal = age?.value
    const sizeVal = size?.value
    const energyVals = energy?.map(energy => energy.value)
    const trainingVal = training?.value
    const listing = {name, type, picPaths, breed, traitValues, bio, hypoVal, ageVal, sizeVal, energyVals, trainingVal}
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
    try {
      if (!files) {
        throw Error('Please select a file first.')
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
        throw Error('Could not successfully upload.')
      }
    }

    catch (error) {
      console.log(`${error} Could not complete request.`)
      setUploadError(error.message)
    }
  }

  const genBio = async () => {
      console.log('Sending request to generate Bio')
      const traitValues = traits?.map(trait => trait.value)
      const hypoVal = hypoallergenic?.value
      const ageVal = age?.value
      const sizeVal = size?.value
      const energyVals = energy?.map(energy => energy.value)
      const trainingVal = training?.value
      const l = {path: picPaths, name, type, breed, traitValues, hypoVal, ageVal, sizeVal, energyVals, trainingVal}

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

      <label>Pet Name</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <Dropdown question={"Animal Type"} isMulti={false} options={animalTypes} onChange={(value) => setType(value.value)} />

      <label>Breed:</label>
      <input 
        type="text"
        onChange={(e) => setBreed(e.target.value)}
        value={breed}
        className={emptyFields.includes('breed') ? 'error' : ''}
      />

      <Dropdown question={"Hypoallergenic"} isMulti={false} options={hypo} onChange={(value) => setHypo(value)} />


      <label className="listing-info">Upload a Profile Picture</label>
      <input
        className="file-upload"
        id="file-upload"
        type="file" 
        onChange={(e) => setFiles(e.target.files[0])} // later will need to change to accommodate 2+ pics
      />
      <label htmlFor="file-upload" className="file-upload-label">Choose File</label>
      <button type="button" onClick={handleUpload}>Upload</button>

      {uploadError && <div className="error">{uploadError}</div>}

      <Dropdown question={"Age"} isMulti={false} options={ageVals} onChange={(value) => setAge(value)} />

      <Dropdown question={"Size"} isMulti={false} options={sizeVals} onChange={(value) => setSize(value)} />

      <label>Weight (lbs)</label>
      <input 
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />
      
      <Dropdown question={"Energy Level"} isMulti={true} options={energyVals} onChange={(value) => setEnergy(value)} />

      <Dropdown question={"Temperament"} isMulti={true} options={temperVals} onChange={(value) => setTraits(value)} />

      <Dropdown question={"Training Level"} isMulti={false} options={trainingVals} onChange={(value) => setTraining(value)} />

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