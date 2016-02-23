var React = require('react');


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
  passwordLi: function() {
    var passwordErrors = [];
    if (this.state.password.length < 8 && this.state.password !== "") {
      passwordErrors.push("Password must be at least 8 characters long");
    }

    if (passwordErrors.length === 0) {
      return ;
    } else {
      return <ul>
        {passwordErrors.map(function(error){
          return <li>{error}</li>;
        })}
      </ul>;
    }
  },
  render: function() {
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    var matchedPassword = "";
    if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== "") {
      matchedPassword = "Passwords do not match!";
    }
    return <form action="/users" method="post" className="new-user-form">
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
        {this.passwordLi()}
      <br/>
      <label>Confirm Password
        <input type="password" value={this.state.confirmPassword}
            onChange={this.confirmPasswordChange} />
      </label>
      <div>{matchedPassword}</div>
      <br/>
      <input type="submit"/>
    </form>;
  }
});

module.exports = NewUserForm;
