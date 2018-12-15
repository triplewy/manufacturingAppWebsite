import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import './AddCompanyModal.css';

const url = process.env.REACT_APP_API_URL

export default class AddCompanyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.submit = this.submit.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  submit() {
    fetch(url + '/api/admin/company/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: this.state.name
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'success') {
        this.setState({showModal: false})
      } else {
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='newButton' onClick={this.toggleModal}>
          <p style={{textAlign: 'center'}}>Add Company</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Add Company</Modal.Title>
          </Modal.Header>
          <Modal.Body className='add'>
            <div>
              <p>Name:</p>
              <input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
            <button onClick={this.submit} disabled={this.state.name.length === 0} style={{backgroundColor: this.state.name.length === 0 ? '#ccc' : '#9EDFB5'}}>Submit</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
