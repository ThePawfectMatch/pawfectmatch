import { useState } from "react"
import { useListingsContext } from "../hooks/useListingsContext"

const ListingForm = () => {
    const { dispatch } = useListingsContext()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) => {
        // prevent refresh
        e.preventDefault()

        const listing = {name, type, breed}

        const response = await fetch('/api/listings', {
            method: 'POST',
            body: JSON.stringify(listing),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setError(null)
            setEmptyFields([])
            setName('')
            setType('')
            setBreed('')
            console.log('New Listing Added', json)
            dispatch({type: 'CREATE_LISTING', payload: json})
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Listing</h3>

            <label>Pet Name:</label>
            <input type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
             // add error class if empty field to do styling if we want
             className={emptyFields && emptyFields.includes('name') ? 'error' : ''}
             />

            <label>Pet Type:</label>
            <input type="text"
             onChange={(e) => setType(e.target.value)}
             value={type}
             className={emptyFields && emptyFields.includes('type') ? 'error' : ''}
             />

            <label>Pet Breed:</label>
            <input type="text"
             onChange={(e) => setBreed(e.target.value)}
             value={breed}
             className={emptyFields && emptyFields.includes('breed') ? 'error' : ''}
             />

            <button>Add Listing</button>
            {error && <div className="error">{error}</div>
            }
        </form>
    )
}

export default ListingForm