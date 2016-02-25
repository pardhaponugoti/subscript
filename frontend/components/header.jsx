var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var SessionBackendActions = require('../actions/sessionBackendActions.js');
var SessionStore = require('../stores/session.js');
var NewSessionForm = require('../components/newSessionForm.jsx');
var NewUserForm = require('../components/newUserForm.jsx');

var Header = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser(),
      loggedIn: SessionStore.loggedIn(),
      modalIsOpen: false,
      signInOpen: true
    };
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  onSessionChange: function() {
    console.log("sessionChangeInHeader");
    this.setState({
      currentUser: SessionStore.currentUser(),
      loggedIn: SessionStore.loggedIn(),
      modalIsOpen: false,
      signInOpen: true
    });
  },

  currentUserUrl: function() {
    return "users/" + this.state.currentUser.id;
  },
  editUserUrl: function() {
    return this.currentUserUrl() + "/edit";
  },

  toggleModal: function() {
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
    if (this.state.loggedIn) {
      return <div className="btn-group nav navbar-nav navbar-right">
        <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          {this.state.currentUser.email} <span className="caret"></span>
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
        inputs.form = <NewSessionForm />;
        inputs.string = "New user?  ";
        inputs.button = <Button onClick={this.openSignUpForm}>Sign Up</Button>;
      } else {
        inputs.header = "Sign Up";
        inputs.form = <NewUserForm />;
        inputs.string = "Already a user?";
        inputs.button = <Button onClick={this.openSignInForm}>Sign In</Button>;
      }
      return <div className="nav navbar-nav navbar-right btn-group">
        <button className="btn btn-default btn-sm" onClick={this.toggleModal}>Sign In</button>
        <Modal show={this.state.modalIsOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{inputs.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {inputs.form}
          </Modal.Body>
          <Modal.Footer>
            {inputs.string}
            {inputs.button}
          </Modal.Footer>
        </Modal>
      </div>;
    }
  },
  render: function() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header btn-group">
        <a onClick={this.renderRoot} className="btn btn-default btn-sm">WebSiteName</a>
      </div>
      <div id="navbarCollapse" className="collapse navbar-collapse">
        <form role="search" className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text" placeholder="Search" className="form-control"/>
          </div>
        </form>
        {this.userDropdown()}
      </div>
    </nav>;
  }
});

module.exports = Header;
