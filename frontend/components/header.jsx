var React = require('react');
var History = require('react-router').History;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var SessionBackendActions = require('../actions/sessionBackendActions.js');
var NewSessionForm = require('../components/newSessionForm.jsx');
var NewUserForm = require('../components/newUserForm.jsx');

var Header = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      modalIsOpen: false,
      signInOpen: true
    };
  },
  componentWillReceiveProps: function() {
    this.setState({
      modalIsOpen: false
    });
  },
  signOut: function() {
    SessionBackendActions.signOutUser();
  },
  currentUserUrl: function() {
    return "#/users/" + this.props.currentUser.id;
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
  userDropdown: function() {
    if (this.props.loggedIn) {
      return <div className="btn-group nav navbar-nav navbar-right">
        <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          {this.props.currentUser.email} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href={this.currentUserUrl()}>My Page</a></li>
          <li><a href={this.editUserUrl()}>Edit Profile</a></li>
          <li><a href="/" onClick={this.signOut}> Sign Out</a></li>
        </ul>
      </div>;
    } else {
      var inputs = {};
      if (this.state.signInOpen) {
        inputs.header = "Sign In";
        inputs.form = <NewSessionForm />;
      } else {
        inputs.header = "Sign Up";
        inputs.form = <NewUserForm />;
      }

      return <div className="btn-group nav navbar-nav navbar-right">
        <button className="btn btn-default btn-sm" onClick={this.toggleModal}>Sign In</button>
        <Modal show={this.state.modalIsOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{inputs.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {inputs.form}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.openSignInForm}>Sign In</Button>
            <Button onClick={this.openSignUpForm}>Sign Up</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>;
    }
  },
  render: function() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">WebSiteName</a>
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
