import React from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';

export const DeleteEventModal = ({ onDelete, eventText, onClose }) => {
  return(
    <>
     

      

      <div class="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <p>{eventText}</p>
      </div>
      <div class="modal-footer">
        <button onClick={onDelete} type="button" class="btn btn-primary">Delete</button>
        <button type="button" onClick={onClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};