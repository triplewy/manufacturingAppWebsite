import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './NotificationModal.css';

const url = process.env.REACT_APP_API_URL

export default class NotificationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      submitted: false,
      uploaded: false,
      message: ''
    };

    this.submit = this.submit.bind(this)
  }

  submit(companyId, message) {
    fetch(url + '/api/admin/notification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        companyId: companyId,
        message: message
      })
    })
    .then(res => res.json())
    .then(data => {

    })
  }

  render() {
    return (
      <div>
        <button className='import' onClick={() => this.setState({ showModal: !this.state.showModal })}>Send Notification</button>
        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: !this.state.showModal })}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Send Company-wide Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body className='importModal'>
            <div>
              <p>Message</p>
              <input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
            </div>
            <button onClick={() => this.submit(this.props.companyId, this.state.message)} style={{backgroundColor: this.state.message ? '#9EDFB5' : '#f1f1f1'}}>Submit</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
