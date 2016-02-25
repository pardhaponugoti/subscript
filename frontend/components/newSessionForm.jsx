var React = require('react');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var SessionStore = require('../stores/session.js');
var History = require('react-router').History;


var NewSessionForm = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      email : "" ,
      password : "" ,
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
    SessionBackendActions.signInUser({user:
      {email: this.state.email,
       password: this.state.password}
    });
  },
  componentDidMount: function() {
    if (SessionStore.loggedIn()) {
      this.history.push("/");
    }
  },
  render: function() {
    return <div>
      <form action="/session" method="post" className="new-session-form" onSubmit={this.handleSubmit} >
        <label>Email
          <input type="string" name="user[email]" value={this.state.email}
              onChange={this.emailChange} />
        </label>
        <br/>
        <label>Password
          <input type="password" name="user[password]" value={this.state.password}
              onChange={this.passwordChange} />
        </label>
        <br/>
        <input className = "btn btn-default" type="submit" value="Sign In"/>
      </form>
    </div>;
  }
});

module.exports = NewSessionForm;
