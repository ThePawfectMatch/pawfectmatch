import { useListingsContext } from '../hooks/useListingsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import "./ListingDetails.css"

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
    <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <h1>{listing.name}</h1>
        <img src="/images/test_avatar.jpg" alt="Avatar" styles="width:300px;height:300px;"></img>
      </div>
      <div class="flip-card-back">
        <p>{listing.type}</p>
        <p>{listing.breed}</p>
      </div>
    </div>
  </div>
  )
}

export default ListingDetails