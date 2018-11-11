import React from 'react';
import Dropzone from 'react-dropzone'
import './ImportDropzone.css'

export default class ImportDropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropzoneActive: false
    };

    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragEnter() {
    this.setState({dropzoneActive: true});
  }

  onDragLeave() {
    this.setState({dropzoneActive: false});
  }

  onDrop(accepted, rejected) {
    console.log("files accepted", accepted);
    console.log("files rejected", rejected);
    if (accepted.length > 0) {
      if (accepted.length > 1) {
        this.setState({dropzoneActive: false})
        alert("You can only upload 1 CSV file");
      } else {
        this.setState({dropzoneActive: false});
        this.props.acceptCSV(accepted)
      }
    } else {
      this.setState({dropzoneActive: false})
    }
  }

  render() {
    const dropzoneActive = this.state.dropzoneActive

    return (
      <Dropzone
        disableClick
        accept={'text/csv'}
        style={{width: '100%', height: '100%'}}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
      <div className="importDropzone" style={{borderColor: this.state.dropzoneActive ? '#9EDFB5' : '#ccc'}}>
        <div>
          <p>Drag your file here or</p>
          <label htmlFor="inputImageButton">
            browse
          </label>
        </div>
      </div>
      <input id="inputImageButton" type="file" accept="text/csv" onChange={this.props.acceptCSV}></input>
    </Dropzone>
    )
  }
}
