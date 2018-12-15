import React, { Component } from 'react';
import './LineList.css';

const url = process.env.REACT_APP_API_URL

export default class LineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      selectedLines: []
    };

    this.fetchLines = this.fetchLines.bind(this)
    this.renderLines = this.renderLines.bind(this)
    this.selectLine = this.selectLine.bind(this)
  }

  componentDidMount() {
    this.fetchLines()
  }

  fetchLines() {
    fetch(url + '/api/admin/company/' + this.props.companyId + '/lines', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({lines: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  renderLines() {
    var renderedLines = [];
    if (this.state.lines.length > 0) {
      renderedLines = this.state.lines.map((item, index) => {
        return (
          <li
            className={this.props.lines.includes(item.id) ? 'selected' : 'notSelected'}
            onClick={this.props.selectLine.bind(this, item.id)}
            key={index}
          >
            <p>{'Line ' + item.name}</p>
          </li>
        )
      })
    }
    return renderedLines
  }

  selectLine(index) {
    var selectedLines = this.state.selectedLines
    if (selectedLines.includes(index)) {
      selectedLines.splice(selectedLines.indexOf(index), 1)
    } else {
      selectedLines.push(index)
    }
    this.setState({selectedLines: selectedLines})
  }

  render() {
    return (
      <div className='lineList'>
        <p>Lines</p>
        <ul>
          {this.renderLines()}
        </ul>
      </div>
    )
  }
}
