var React = require('react');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;

var NewUserForm = React.createClass({
  getInitialState: function() {
    return {
      email : "" ,
      password : "" ,
      confirmPassword : "",
      firstName: "",
      lastName: "",
      inputEnabled: true,
      alertVisible: false,
      errors: []
    };
  },
  firstNameChange: function(e) {
    this.setState({
      firstName: e.target.value
    });
  },
  lastNameChange: function(e) {
    this.setState({
      lastName: e.target.value
    });
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
  confirmPasswordChange: function(e) {
    this.setState({
      confirmPassword: e.target.value
    });
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

  passwordUl: function() {
    var passwordErrors = [];
    var length = this.state.password.length;
    this.validPassword = true;

    if (length < 8 && length > 0) {
      this.validPassword = false;
      passwordErrors.push(<li key="1"><strong><font color="red">
        ✗ Password must be at least 8 characters long
      </font></strong></li>);
    } else if (length > 0){
      passwordErrors.push(<li key="2"><font color="green">
        ✔ Password must be at least 8 characters long
      </font></li>);
    }

    if (length > 0 && containsNumber(this.state.password)) {
      passwordErrors.push(<li key="3"><font color="green">
        ✔ Password must contain a number
      </font></li>);
    } else if (length > 0){
      this.validPassword = false;
      passwordErrors.push(<li key="4"><strong><font color="red">
        ✗ Password must contain a number
      </font></strong></li>);
    }

    if (passwordErrors.length === 0) {
      return ;
    } else {
      return <ul className="password-errors-ul">
        {passwordErrors.map(function(error){
          return error;
        })}
      </ul>;
    }
  },
  matchedPassword: function() {
    this.passwordMatch = true;
    if (this.state.password !== "" && this.state.password.length > 7 && containsNumber(this.state.password)) {
      if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== "") {
        this.passwordMatch = false;
        return <div><strong><font color="red">
          ✗ Passwords do not match!
        </font></strong></div>;
      } else if (this.state.confirmPassword !== "" && this.state.confirmPassword === this.state.password) {
        return <div><font color="green">
          ✔ Passwords match!
        </font></div>;
      }
    } else {
      return;
    }

  },

  submitButtonDisabled: function() {
    // if(this.state.firstName.length === 0 ||
    //   this.state.lastName.length === 0 ||
    //   this.state.email.length === 0 ||
    //   this.state.password.length === 0 ||
    //   this.state.confirmPassword.length === 0 ||
    //   !this.validPassword ||
    //   !this.passwordMatch) {
    //     return true;
    //   } else {
    //     return false;
    //   }

    if( this.state.password.length > 0 ) {
      if (this.state.confirmPassword !== this.state.password) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var successCallback = function(id) {
      this.props.closeModalCallback();
      BrowserHistory.push("/users/"+id+"/edit");
    }.bind(this);
    var errorCallback=function(error) {
      this.setState({
        alertVisible: true,
        errors: JSON.parse(error)
      });
    }.bind(this);
    SessionBackendActions.signUpUser(
      {user:
        {email: this.state.email,
         password: this.state.password,
         first_name: this.state.firstName,
         last_name: this.state.lastName}},
      successCallback,
      errorCallback
     );
  },
  render: function() {
    return <div>
      <form action="/users" method="post" className="new-user-form" onSubmit={this.handleSubmit}>
        {this.showAlert()}
        <input className="session-user-form-input" type="string" name="user[first_name]"
          value={this.state.firstName} placeholder="First Name*" onChange={this.firstNameChange}/>
        <br/>
        <input className="session-user-form-input" type="string" name="user[last_name]"
          value={this.state.lastName} placeholder="Last Name*" onChange={this.lastNameChange}/>
        <br/>
        <input className="session-user-form-input" type="string" name="user[email]"
          value={this.state.email} placeholder="Email*" onChange={this.emailChange} />
        <br/>
        <input className="session-user-form-input" type="password" name="user[password]"
          value={this.state.password} placeholder="Password*" onChange={this.passwordChange} />
        {this.passwordUl()}
        <br/>
        <input className="session-user-form-input" type="password" value={this.state.confirmPassword}
            placeholder="Confirm Password*" onChange={this.confirmPasswordChange} />
        {this.matchedPassword()}
        <br/>
        <br/>
        <input className="btn btn-default" type="submit" disabled={this.submitButtonDisabled()} value="Sign Up" />
      </form>
    </div>;
  }
});

module.exports = NewUserForm;

// disabled={this.submitButtonDisabled()}

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

function containsNumber(str) {
  var containsNum = false;
  for(var i = 0; i < str.length; i++) {
    if (isNumeric(str[i])) {
      containsNum = true;
    }
  }
  return containsNum;
}
