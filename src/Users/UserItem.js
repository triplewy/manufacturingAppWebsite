import React, { Component } from 'react';
import UserDropdown from './UserDropdown'
import downCaret from '../Images/down-caret-icon.png'
import './UserItem.css';

const url = process.env.REACT_APP_API_URL

export default class UserItem extends Component {
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
        <UserDropdown show={this.state.show} userId={this.props.userId}/>
      </li>
    )
  }
}
