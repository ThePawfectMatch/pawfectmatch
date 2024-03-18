import { useEffect } from 'react'

const CardDetails = ({ listing }) => {
  

  return (
      <label className="card">
          <input className='checkbox' type="checkbox" />
          <div className="flip-card">

            <div className="front">
              <img src="/images/test_avatar.jpg" alt="Avatar"></img>
              <h1>{listing.name}</h1>
              <h2>Age: 10 years</h2>
              <h2>Distance: 10 miles</h2>
              <div className='like-button'> 
                <input type="checkbox" />
              </div>
              <h3>Match: 69%</h3>
            </div>

            <div className="back">
              <h2>About Me</h2>
              <p>Introducing {listing.name}, the gentle giant of the dog world! At 10 years young and 67 pounds, this cuddly canine is the epitome of mellow. With a heart as big as his size, Yolo is both house trained and hypoallergenic, making him the perfect addition to any family seeking a loyal and affectionate companion. Get ready to snuggle up with Yolo and experience a lifetime of love and joy!</p>
              <h3>Details</h3>
              <p>Animal Type: {listing.type}</p>
              <p>Breed: {listing.breed}</p>
              <h3>Contact Information</h3>
              <p>Email: Yourmom@gmail.com</p>
              <p>Phone Number: 911-420-6969</p>
            </div>

          </div>
    </label>
  )
}

export default CardDetails