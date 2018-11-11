import React, { Component } from 'react';
import downCaret from '../Images/down-caret-icon.png'
import './Users.css';

const url = process.env.REACT_APP_API_URL

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.fetchUsers = this.fetchUsers.bind(this)
    this.renderUsers = this.renderUsers.bind(this)
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers() {
    fetch(url + '/api/admin/company/' + this.props.companyId + '/users', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Unauthorized Access') {
        // this.setState({failedLogin: 1})
      } else {
        this.setState({users: data})
      }
    })
    .catch(function(err) {
        console.log(err);
    });
  }

  renderUsers() {
    var renderedUsers = [];
    if (this.state.users.length > 0) {
      renderedUsers = this.state.users.map((item, index) => {
        return (
          <li key={item.userId}>
            <p>{'User ' + item.userId}</p>
            <button>
              <img src={downCaret}/>
            </button>
          </li>
        )
      })
    }
    return renderedUsers
  }



  render() {
    return (
      <div className='users'>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}
