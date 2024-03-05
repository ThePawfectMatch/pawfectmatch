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
        <button onClick={goToPreviousListing} disabled={currentIndex === 0}>
          Previous
        </button>
        <CardDetails key={listing[currentIndex]._id} listing={listing[currentIndex]}/>
        <button onClick={goToNextListing} disabled={currentIndex === listing.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CardDisplay;
