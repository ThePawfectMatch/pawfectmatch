import { useListingsContext } from '../hooks/useListingsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ListingDetails = ({ listing }) => {
  const { dispatch } = useListingsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if(!user) {
      return 
    }

    const response = await fetch('/api/listings/' + listing._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_LISTING', payload: json})
    }
  }

  return (
    <div className="listing-details">
      <h4>{listing.name}</h4>
      <p><strong>Type: </strong>{listing.type}</p>
      <p><strong>Breed: </strong>{listing.breed}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ListingDetails