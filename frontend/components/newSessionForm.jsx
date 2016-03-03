var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;

var SessionBackendActions = require('../actions/sessionBackendActions.js');

var NewSessionForm = React.createClass({
  getInitialState: function() {
    return {
      email : "" ,
      password : "" ,
      alertVisible: false,
      errors: [],
      loading: false
    };
  },
  emailChange: function(e) {
    this.setState({
      email: e.target.value
    });
  },
  passwordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    var successCallback = function(id) {
      this.props.closeModalCallback();
      BrowserHistory.push("/users/"+id);
    }.bind(this);

    var errorCallback=function(error) {
      this.setState({
        alertVisible: true,
        errors: JSON.parse(error),
        loading: false
      });
    }.bind(this);

    SessionBackendActions.signInUser(
      {user:
        {email: this.state.email,
         password: this.state.password}},
       successCallback,
       errorCallback
     );
  },

  showAlert: function() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" className="alert-messages" onDismiss={this.handleAlertDismiss} dismissAfter={4000}>
          {this.state.errors.map(function(error) {
            return <h4>{error}</h4>;
          })}
        </Alert>
      );
    } else {
      return null;
    }
  },
  handleAlertDismiss: function() {
    this.setState({
      alertVisible: false
    });
  },

  submitButtonDisabled: function() {
    if (this.state.email.length === 0 || this.state.password.length < 8) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    if (this.state.loading) {
      return <div className="loading-container">
        <div className="jawn"></div>
      </div>;
    } else {
      return <div>
        <form action="/session" method="post" className="form new-session-form" onSubmit={this.handleSubmit} >
          {this.showAlert()}
          <div className="form-group">
            <input type="string" name="user[email]" id="new-session-email" placeholder="Email" value={this.state.email}
              onChange={this.emailChange} />
          </div>
          <div className="form-group">
            <input type="password" name="user[password]" id="new-session-password" placeholder="Password" value={this.state.password}
              onChange={this.passwordChange} />
          </div>
          <input className="btn btn-default" type="submit" value="Sign In"/>
        </form>
      </div>;
    }
  }
});

// disabled={this.submitButtonDisabled()}
module.exports = NewSessionForm;
