import { useEffect } from 'react'
import { useState } from 'react'

const CardDetails = ({ listing }) => {
  const [isLiked, setLike] = useState(false); // replace with listing.likeStatus (should stay liked if was previously liked)
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = ["/images/dog1.jpg", "/images/dog2.jpg", "/images/dog3.jpg"]  // replace with list of listing pics
  const [currPic, setCurrPic] = useState(images[currentIndex]); 

  const handleLike = () => {

    setLike(!isLiked)

    // put backend liked pets updates here
  }

  const [isLoading, setIsLoading] = useState(true);
  const getNextPhoto = (event) => {
    // get next photo from backend and update photo var

    if (!isLoading) {
      const boundingRect = event.target.getBoundingClientRect();
      const clickX = event.clientX - boundingRect.left;

      if (clickX <= boundingRect.width / 2) {
        // onClick('left'); // Call the onClick function with 'left' argument
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
      } else {
        // onClick('right'); // Call the onClick function with 'right' argument
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }
    }
  }

  // updates current photo
  useEffect(() => {
    setCurrPic(images[currentIndex])
  }, [currentIndex]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // use effect ensures pet names can be as long as needed and are only calculated once
  const [fontSize, setFontSize] = useState(45);
  const [doneCalc, setDoneCalc] = useState(false);
  useEffect(() => {
    const containerWidth = 400;
    const textWidth = getTextWidth(listing.name.toUpperCase(), fontSize + 'px More Sugar Regular');

    if (textWidth > containerWidth) {
      const newFontSize = Math.floor(fontSize * (containerWidth / textWidth));
      setFontSize(newFontSize);
    }
    setDoneCalc(true)
  }, [listing.name]);

  // Function to measure text width
  const getTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const width = context.measureText(text).width;
    return width;
  };

  return (
    <div className="card-div">
      <label className="card">
          <input className='checkbox' type="checkbox" />
          <div className="flip-card">

            <div className="front">
              <button className="pet-photos" onClick={getNextPhoto}>
                <img src={currPic} alt="listing-photo" onLoad={handleImageLoad}></img>
                <p className='photo-index'>{currentIndex+1}/{images.length}</p>
              </button>
              <div className='name'>
                {doneCalc ? <h1 style={{ fontSize: `${fontSize}px`, whiteSpace: 'nowrap' }}>{listing.name.toUpperCase()}</h1> : <div></div>}
              </div>
              <h2>Age: 10 years</h2>
              <h2>Distance: 10 miles</h2>

            <div className='like-and-match'>
              <div className='like-button-container'> 
                <label className={`like-button ${isLiked ? 'liked' : ''}`}>
                  <img src="/images/like_button.png" alt="like" onClick={handleLike}/>
                </label>
              </div>

              <h3>Match: 70%</h3>
            </div>
            </div>

            <div className="back">
              <h2>About Me</h2>

              {(listing.bio === "") ? (
                <p>No bio!</p>
              ) : (
                <p>{listing.bio}</p>
              )}


              <h3>Details</h3>
              <p>Animal Type: {listing.type}</p>
              <p>Breed: {listing.breed}</p>
              <h3>Contact Information</h3>
              <p>Email: Yourmom@gmail.com</p>
              <p>Phone Number: 911-421-6868</p>
            </div>

          </div>
    </label>
    </div>
  )
}

export default CardDetails