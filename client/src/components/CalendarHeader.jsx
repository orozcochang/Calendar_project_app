import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return(
    <div style={{paddingTop:'3px', paddingBottom:'3px'}}>
      <h4  className='mt-4' style={{display:'inline'}}>{dateDisplay}</h4>
      
        <button onClick={onBack} className='btn' style={{display:'inline', float:'right', paddingTop:'3px', paddingBottom:'3px'}} id="backButton">Back</button>
        <button onClick={onNext} className='btn' style={{display:'inline', float:'right', paddingTop:'3px', paddingBottom:'3px'}} id="nextButton">Next</button>
      
    </div>
  );
};