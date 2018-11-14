import React, { Component } from 'react';
import RegisterDropdown from './RegisterDropdown'
import downCaret from '../Images/down-caret-icon.png'
import './RegisterItem.css';

const url = process.env.REACT_APP_API_URL

export default class RegisterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <li>
        <div className='item' onClick={() => this.setState({show: !this.state.show})}>
          <p>{this.props.name}</p>
          <button>
            <img src={downCaret}/>
          </button>
        </div>
        <RegisterDropdown show={this.state.show} companies={this.props.companies} userId={this.props.userId}/>
      </li>
    )
  }
}
