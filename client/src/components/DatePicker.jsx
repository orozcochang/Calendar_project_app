import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

class MyDatePickerModal extends React.Component {
  state = {
    startDate: new Date(),
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Date Picker</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    );
  }
}

export default MyDatePickerModal;