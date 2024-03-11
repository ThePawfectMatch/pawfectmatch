import { useState } from "react"
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ListingForm = () => {
  const { dispatch } = useListingsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user) {
      setError('You must be logged in')
      return
    }

    const listing = {name, type, breed}

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
      setError(null)
      setEmptyFields([])
      console.log('new listing added', json)
      dispatch({type: 'CREATE_LISTING', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Post a Pet</h3>

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

      <button>Add Listing</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ListingForm