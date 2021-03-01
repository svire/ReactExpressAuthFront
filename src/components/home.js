import React, {Component} from "react";

import UserService from "../services/user.service";
import {connect} from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({content: response.data});
      },
      (error) => {
        this.setState({content: error.response && error.response.data}) ||
          error.message ||
          error.toString();
      }
    );
  }

  render() {
    return (
      <div className='container'>
        <header className='jumbotron'>
          <h1>Some kind of homepage</h1>
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {user} = state.auth;
  return {user};
}
export default connect(mapStateToProps)(Home);
