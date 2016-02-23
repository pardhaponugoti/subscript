var React = require('react');

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


var NewUserForm = React.createClass({
  getInitialState: function() {
    return {
      email : "" ,
      password : "" ,
      confirmPassword : ""
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
  confirmPasswordChange: function(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  },
  passwordUl: function() {
    var passwordErrors = [];
    if (this.state.password.length < 8 && this.state.password.length > 0) {
      passwordErrors.push(<li><strong><font color="red">
        Password must be at least 8 characters long
      </font></strong></li>);
    } else if (this.state.password.length > 0){
      passwordErrors.push(<li><font color="green">
        Password must be at least 8 characters long
      </font></li>);
    }

    if (this.state.password.length > 0 && containsNumber(this.state.password)) {
      passwordErrors.push(<li><font color="green">
        Password must contain a number
      </font></li>);
    } else if (this.state.password.length > 0){
      passwordErrors.push(<li><strong><font color="red">
        Password must contain a number
      </font></strong></li>);
    }

    if (passwordErrors.length === 0) {
      return ;
    } else {
      return <ul>
        {passwordErrors.map(function(error){
          return error;
        })}
      </ul>;
    }
  },
  matchedPassword: function() {
    if (this.state.password !== "" && this.state.password.length > 7 && containsNumber(this.state.password)) {
      if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== "") {
        return <div><strong><font color="red">
          Passwords do not match!
        </font></strong></div>;
      } else if (this.state.confirmPassword !== "" && this.state.confirmPassword === this.state.password) {
        return <div><font color="green">
          Passwords match!
        </font></div>;
      }
    } else {
      return;
    }

  },
  render: function() {
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    return <div>
      <form action="/users" method="post" className="new-user-form">
        <input name="authenticity_token" type="hidden" value={csrfToken} />
        <label>Email
          <input type="text" name="user[email]" value={this.state.email}
              onChange={this.emailChange} />
        </label>
        <br/>
        <label>Password
          <input type="password" name="user[password]" value={this.state.password}
              onChange={this.passwordChange} />
        </label>
          {this.passwordUl()}
        <br/>
        <label>Confirm Password
          <input type="password" value={this.state.confirmPassword}
              onChange={this.confirmPasswordChange} />
        </label>
        {this.matchedPassword()}
        <br/>
        <input type="submit"/>
      </form>
      <div> Already a user?
        <a href="#/session/new">Sign In</a>
      </div>
    </div>;
  }
});

module.exports = NewUserForm;
