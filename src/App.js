import React, {Component} from "react";
import "./App.css";
import {Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from "react-redux";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardUser from "./components/boarduser";
import BoardModerator from "./components/boardmoderator";
import BoardAdmin from "./components/boardadmin";
import Users from "./components/users";

import {logout} from "./store/actions/auth";
import {clearMessage} from "./store/actions/message";
import {history} from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    //clear message when changing location
    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }
  componentDidMount() {
    const user = this.props.user;
    //alert(user);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"), //("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  componentDidUpdate() {
    const user = this.props.user;
    if (user !== this.state.currentUser) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"), //"ROLE_USER"
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }
  render() {
    const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={"/"} className='navbar-brand'>
              LOGO
            </Link>
            <div className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to={"/home"} className='nav-link'>
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className='nav-item'>
                  <Link to={"/mod"} className='nav-link'>
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className='nav-item'>
                  <Link to={"/admin"} className='nav-link'>
                    Admin Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className='nav-item'>
                  <Link to={"/users"} className='nav-link'>
                    All users
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className='nav-item'>
                  <Link to={"/user"} className='nav-link'>
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to={"/profile"} className='nav-link'>
                    {currentUser.username}
                  </Link>
                </li>
                <li className='nav-item'>
                  <a href='/login' className='nav-link' onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to={"/login"} className='nav-link'>
                    Login
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to={"/register"} className='nav-link'>
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className='container mt-3'>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/users' component={Users} />
              <Route path='/user' component={BoardUser} />
              <Route path='/mod' component={BoardModerator} />
              <Route path='/admin' component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
//<Route exact path='/users' component={Users} />
function mapStateToProps(state) {
  const {user} = state.auth;
  return {user};
}

//export default App;
export default connect(mapStateToProps)(App);