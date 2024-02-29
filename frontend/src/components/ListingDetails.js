import { useListingsContext } from "../hooks/useListingsContext"

const ListingDetails = ({ listing }) => {
    const { dispatch } = useListingsContext()

    const handleClick = async () => {
        const response = await fetch('/api/listings/' + listing._id, {
            method: 'DELETE'
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
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default ListingDetails