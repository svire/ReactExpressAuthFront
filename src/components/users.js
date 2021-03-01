import React, {Component} from "react";
import Table from "./Table/Table";
import userService from "../services/user.service";
import {connect} from "react-redux";
import {func} from "prop-types";
import message from "../store/reducers/message";

import {deleteUser} from "../store/actions/auth";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      content: "",
    };

    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(id) {
    const {dispatch, history} = this.props;
    let newusers = this.state.users.filter((item) => item.id !== id);
    this.setState({users: newusers});

    //alert(id);
    dispatch(deleteUser(id));
  }

  componentDidMount() {
    userService.getUsers().then(
      (response) => {
        this.setState({users: response.data});
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const {isLoggedIn, message} = this.props;
    return (
      <div className='container'>
        <header className='jumbotron'>
          <h1>List of users</h1>
          {message && (
            <div className='form-group'>
              <div
                className='alert alert-danger'
                role='alert'
                style={{textAlign: "center"}}
              >
                {message}
              </div>
            </div>
          )}
          <Table user={this.state.users} delete={this.deleteUser} />

          <button
            style={{marginTop: "20px"}}
            onClick={() => alert(this.state.users)}
          >
            CHECK THIS OUT
          </button>
          {this.state.users.length === 0 ? (
            <p>There are no users yet!</p>
          ) : (
            <p> </p>
          )}
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {isLoggedIn} = state.auth;
  const {message} = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Users);
//export default Users;
