import { useEffect }from 'react'
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'

// components
import ListingDetails from '../components/ListingDetails'
import Navbar from '../components/Navbar'

const Main = () => {
  const {listings, dispatch} = useListingsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listings', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LISTINGS', payload: json})
      }
    }

    fetchListings()
  }, [dispatch])

  return (
    <div>
        <Navbar />
        <div className="main">
        <div className="listings">
            {listings && listings.map((listing) => (
            <ListingDetails key={listing._id} listing={listing} />
            ))}
        </div>
        </div>
        <Link to="/Listing">
          <button>List</button>
        </Link>
    </div>
  )
}

export default Main