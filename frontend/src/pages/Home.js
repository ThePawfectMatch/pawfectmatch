import { useEffect }from 'react'
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ListingDetails from '../components/ListingDetails'
import ListingForm from '../components/ListingForm'

const Home = () => {
  const {listings, dispatch} = useListingsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listings', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LISTINGS', payload: json})
      }
    }

    if(user) {
      fetchListings()
    }

    fetchListings()
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="listings">
        {listings && listings.map((listing) => (
          <ListingDetails key={listing._id} listing={listing} />
        ))}
      </div>
      <ListingForm />
    </div>
  )
}

export default Home