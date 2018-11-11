import React, { Component } from 'react';
import downCaret from '../Images/down-caret-icon.png'
import LineModal from './LineModal'
import './Lines.css';

const url = process.env.REACT_APP_API_URL

export default class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: []
    };

    this.fetchLines = this.fetchLines.bind(this)
    this.renderLines = this.renderLines.bind(this)
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
          <li key={item.lineId}>
            <p>{'Line ' + item.lineId}</p>
            <button>
              <img src={downCaret}/>
            </button>
          </li>
        )
      })
    }
    return renderedLines
  }


  render() {
    return (
      <div className='lines'>
        <ul>
          <LineModal companyId={this.props.companyId} />
          {this.renderLines()}
        </ul>
      </div>
    );
  }
}
