import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import '../styles/cardpreview.css'

const CardPreview = ({ name, bio, breed, type, age, weight }) => {
  const [isLiked, setLike] = useState(false); // replace with listing.likeStatus (should stay liked if was previously liked)
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = ["/images/dog1.jpg", "/images/dog2.jpg", "/images/dog3.jpg"]  // replace with list of listing pics
  const [currPic, setCurrPic] = useState(images[currentIndex]); 
  const {user} = useAuthContext()
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    function handleResize() {
      // Calculate scale factor based on window height
      const scaleFactor = window.innerHeight / 750; // Adjust 1000 as needed
      setScaleFactor(scaleFactor);
    }
    // Initial call to set scale factor
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const textWidth = getTextWidth(name.toUpperCase(), fontSize + 'px More Sugar Regular');

    if (textWidth > containerWidth) {
      const newFontSize = Math.floor(fontSize * (containerWidth / textWidth));
      setFontSize(newFontSize);
    }
    else if (name === "") {
        setFontSize(45);
    }
    setDoneCalc(true)
  }, [name]);

  // Function to measure text width
  const getTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const width = context.measureText(text).width;
    return width;
  };

  return (
    <div className="preview-card-div" style={{transform: `scale(${scaleFactor})`, transformOrigin: 'top left' }}>
      <label className="preview-card">
          <input className='preview-checkbox' type="checkbox" />
          <div className="preview-flip-card">

            <div className="preview-front">
              <button className="preview-pet-photos" onClick={getNextPhoto}>
                <img src={currPic} alt="listing-photo" onLoad={handleImageLoad}></img>
                <p className='preview-photo-index'>{currentIndex+1}/{images.length}</p>
              </button>
              <div className='preview-name'>
                {doneCalc ? <h1 style={{ fontSize: `${fontSize}px`, whiteSpace: 'nowrap' }}>{(name === '') ? 'PET NAME' : name.toUpperCase()}</h1> : <div></div>}
              </div>
              <h2>Age: {(!age) ? 'No Age Input' : age}</h2>
              <h2>Weight: {(!weight) ? 'No Weight Input' : `${weight} lbs`}</h2>

            <div className='preview-like-and-match'>
              {/* <div className='preview-like-button-container'> 
                <label className={`preview-like-button ${isLiked ? 'liked' : ''}`}>
                  <img src="/images/like_button.png" alt="like" onClick={handleLike}/>
                </label>
              </div> */}

              {/* <h3>Match: 70%</h3> */}
            </div>
            </div>

            <div className="preview-back">
              <h2>About Me</h2>

              {(bio === "") ? (
                <p>No bio!</p>
              ) : (
                <p>{bio}</p>
              )}


              <h3>Details</h3>
              <p>Animal Type: {(!type) ? 'No Type Selected' : type}</p>
              <p>Breed: {(!breed) ? 'No Breed Input' : breed}</p>
              <h3>Contact Information</h3>
              <p>Email: {user.email}</p>
              <p>Phone Number: {(!user.phoneNumber) ? 'N/A' : user.phoneNumber}</p> 
            </div>

          </div>
    </label>
    </div>
  )
}

export default CardPreview