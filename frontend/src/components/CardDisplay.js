import React, { useState } from 'react';
import CardDetails from './Card';
import '../styles/card.css'

const CardDisplay = ({ listing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousListing = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const goToNextListing = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, listing.length - 1));
  };

  return (
    <div className='nav-buttons'>
    <div className='arrow-button'>
        <button className='left-arrow' onClick={goToPreviousListing} disabled={currentIndex === 0}>
          {/* <img src="/images/chevron.png" alt="Previous Button"/> */}
          &lt;
        </button>
      </div>
      <CardDetails key={listing[currentIndex]._id} listing={listing[currentIndex]}/>
      <div className='arrow-button'>
        <button className='right-arrow' onClick={goToNextListing} disabled={currentIndex === listing.length - 1}>
          {/* <img src='/images/chevron.png' alt="Next Button"/> */}
          &gt;
      </button>
      </div>
    </div>
  );
};

export default CardDisplay;
