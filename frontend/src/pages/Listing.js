
// components
import ListingForm from '../components/ListingForm'
import Navbar from '../components/Navbar'

const Listing = () => {

  return (
    <div>
        <Navbar />
        <div className="postapet">
        <ListingForm />
        </div>
    </div>
  )
}

export default Listing