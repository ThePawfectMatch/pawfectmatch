import React, { useState } from 'react';
import CardDetails from './Card';

const CardDisplay = ({ listing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousListing = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const goToNextListing = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, listing.length - 1));
  };

  return (
    <div>
      <div>
        <div className='nav-buttons'>
          <div className='prev-button'>
            <button onClick={goToPreviousListing} disabled={currentIndex === 0}>
              <img src="/images/chevron.png" alt="Previous Button"/>
            </button>
          </div>
          <CardDetails key={listing[currentIndex]._id} listing={listing[currentIndex]}/>
          <div className='next-button'>
            <button onClick={goToNextListing} disabled={currentIndex === listing.length - 1}>
              <img src='/images/chevron.png' alt="Next Button"/>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
