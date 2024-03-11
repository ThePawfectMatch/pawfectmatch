import { useEffect } from 'react'

const CardDetails = ({ listing }) => {
  

  return (
    <div class="card">
    <div class="card-inner">
      <div class="card-front">
        <h1>{listing.name}</h1>
        <img src="/images/test_avatar.jpg" alt="Avatar"></img>
      </div>
      <div class="card-back">
        <p>{listing.type}</p>
        <p>{listing.breed}</p>
      </div>
    </div>
  </div>
  )
}

export default CardDetails