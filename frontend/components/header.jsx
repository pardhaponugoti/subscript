var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var Link = require('react-router').Link;

var HeaderSearchComponent = require('../components/headerSearchComponent.jsx');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var NewSessionForm = require('../components/newSessionForm.jsx');
var NewUserForm = require('../components/newUserForm.jsx');

var Header = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      signInOpen: true
    };
  },

  // componentWillReceiveProps: function(newProps) {
  //   console.log(newProps);
  //   console.log(newProps.currentUser);
  //   console.log(newProps.loggedIn);
  // },

  currentUserUrl: function() {
    return "users/" + this.props.currentUser.id;
  },
  editUserUrl: function() {
    return this.currentUserUrl() + "/edit";
  },

  toggleModal: function() {
    $("#App").css("filter", "blur(5px)");
    $("#App").css("-webkit-filter", "blur(5px)");
    $("#App").css("-o-filter", "blur(5px)");
    $("#App").css("-moz-filter", "blur(5px)");
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  },
  openSignInForm: function() {
    this.setState({
      signInOpen: true
    });
  },
  openSignUpForm: function() {
    this.setState({
      signInOpen: false
    });
  },
  close: function() {
    $("#App").css("filter", "blur(0px)");
    $("#App").css("-webkit-filter", "blur(0px)");
    $("#App").css("-o-filter", "blur(0px)");
    $("#App").css("-moz-filter", "blur(0px)");
    this.setState({
      modalIsOpen: false
    });
  },

  renderRoot: function() {
    BrowserHistory.push("/");
  },
  showCurrentUserPage: function() {
    BrowserHistory.push("/"+this.currentUserUrl());
  },
  showEditUserPage: function() {
    BrowserHistory.push("/"+this.editUserUrl());
  },
  signOut: function() {
    SessionBackendActions.signOutUser(
      function() {
        BrowserHistory.push("/");
      }
    );
  },

  userDropdown: function() {
    if (this.props.loggedIn) {
      return <div className="btn-group nav navbar-nav navbar-right header-dropdown">
        <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          <img src={this.props.currentUser.image} height="20" width="20"/>
          {" " + this.props.currentUser.first_name + " " + this.props.currentUser.last_name} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={this.showCurrentUserPage}>My Page</a></li>
          <li><a onClick={this.showEditUserPage}>Edit Profile</a></li>
          <li><a onClick={this.signOut}> Sign Out</a></li>
        </ul>
      </div>;
    } else {
      var inputs = {};
      if (this.state.signInOpen) {
        inputs.header = "Sign In";
        inputs.form = <NewSessionForm closeModalCallback={this.close}/>;
        inputs.string = "New user?  ";
        inputs.button = <Button onClick={this.openSignUpForm}>Sign Up</Button>;
      } else {
        inputs.header = "Sign Up";
        inputs.form = <NewUserForm closeModalCallback={this.close}/>;
        inputs.string = "Already a user?";
        inputs.button = <Button onClick={this.openSignInForm}>Sign In</Button>;
      }
      return <div className="nav navbar-nav navbar-right btn-group header-dropdown">
        <button className="btn btn-default btn-sm dropdown-toggle" onClick={this.toggleModal}>{inputs.header}</button>
        <Modal show={this.state.modalIsOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{inputs.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {inputs.form}
          </Modal.Body>
          <Modal.Footer>
            {inputs.string + " "}
            {inputs.button}
          </Modal.Footer>
        </Modal>
      </div>;
    }
  },
  render: function() {
    return <nav className="navbar navbar-fixed-top">
      <div className="navbar-header btn-group header-home">
        <a onClick={this.renderRoot} className="btn btn-default btn-sm">Σ</a>
      </div>
      <HeaderSearchComponent />
      <div id="navbarCollapse" className="collapse navbar-collapse">
        {this.userDropdown()}
        <div className="navbar-right btn-group">
          <Link to="/subscriptions/" className="btn btn-default btn-sm">Companies</Link>
        </div>
      </div>
    </nav>;
  }
});

module.exports = Header;
