import React, { Component } from 'react';
import downCaret from '../Images/down-caret-icon.png'
import AddModal from '../AddModal/AddModal'
import MachineModal from '../MachineModal/MachineModal'
import './FetchList.css';

const url = process.env.REACT_APP_API_URL

export default class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.fetchData = this.fetchData.bind(this)
    this.renderData = this.renderData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(url + this.props.api_url, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({data: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  renderData() {
    var renderedData = [];
    if (this.state.data.length > 0) {
      renderedData = this.state.data.map((item, index) => {
        return (
          <li key={item.id}>
            <p>{item.name}</p>
            <button>
              <img src={downCaret}/>
            </button>
          </li>
        )
      })
    }
    return renderedData
  }


  render() {
    console.log(this.props);
    return (
      <div className='fetchList'>
        <ul>
          {this.props.title === 'Machine' ?
            <MachineModal companyId={this.props.companyId} />
            :
            <AddModal {...this.props} />
          }
          {this.renderData()}
        </ul>
      </div>
    );
  }
}
