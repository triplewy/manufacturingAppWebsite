import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import ImportDropzone from './ImportDropzone'
import './ImportModal.css';

const url = process.env.REACT_APP_API_URL

export default class ImportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      csv: null,
      submitted: false,
      uploaded: false,
      progress: 0
    };

    this.toggleModal = this.toggleModal.bind(this)
    this.acceptCSV = this.acceptCSV.bind(this)
    this.submit = this.submit.bind(this)
    this.upload = this.upload.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  acceptCSV(accepted) {
    this.setState({csv: accepted[0]})
  }

  submit() {
    console.log(this.state.csv);
    var formData = new FormData();
    formData.append('csv', this.state.csv, this.state.csv.name)
    this.setState({submitted: true})
    this.upload(formData)
  }

  upload(formData) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = () => {
     if(xhr.readyState === 4 && xhr.status === 200){
         this.setState({showModal: false, csv: null})
      } else {
        console.log(xhr.responseText);
      }
    }

    xhr.upload.onprogress = (e) => {
      this.setState({progress: e.loaded/e.total})
    }

    xhr.open('POST', url + '/api/admin/company/' + this.props.companyId + '/upload/csv');
    xhr.send(formData)
  }

  render() {
    return (
      <div>
        <button className='import' onClick={this.toggleModal}>Import CSV</button>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{textAlign: 'center'}}>Import CSV</Modal.Title>
          </Modal.Header>
          <Modal.Body className='importModal'>
            {this.state.csv ?
              <div>
                <p>CSV</p>
              </div>
            :
              <ImportDropzone acceptCSV={this.acceptCSV} />
            }
            <button onClick={this.submit} disabled={!this.state.csv} style={{backgroundColor: this.state.csv ? '#9EDFB5' : '#f1f1f1'}}>Submit</button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
