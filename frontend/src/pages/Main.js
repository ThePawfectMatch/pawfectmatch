import { useEffect } from 'react'
import { useListingsContext } from '../hooks/useListingsContext'

// components
import ListingDetails from '../components/ListingDetails'
import ListingForm from '../components/ListingForm'

const Main = () => {
    const {listings, dispatch} = useListingsContext()

    // runs once when component is first rendered (the dependency array)
    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('/api/listings')
            const json = await response.json() // array of listings
            if (response.ok) {
                dispatch({type: 'SET_LISTINGS', payload: json})
            }
        }

        fetchListings()
    }, [dispatch])
    
    return (
        <div className="main">
            <div className="listings">
                {listings && listings.map((listing) => (
                    <ListingDetails key={listing._id} listing={listing} />
                ))}
            </div>
            <ListingForm/>
        </div>
    )
}

export default Main;