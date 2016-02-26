var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var SessionStore = require('../stores/session.js');
var SessionBackendActions = require('../actions/sessionBackendActions.js');

var NewSessionForm = React.createClass({
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
    this.props.closeModalCallback();
    SessionBackendActions.signInUser(
      {user:
        {email: this.state.email,
         password: this.state.password}},
       function(id) {BrowserHistory.push("/users/"+id);}
     );
  },
  // componentDidMount: function() {
  //   if (SessionStore.loggedIn()) {
  //     this.history.push("/");
  //   }
  // },
  render: function() {
    return <div>
      <form action="/session" method="post" className="form" onSubmit={this.handleSubmit} >
        <div className="form-group">
        <input type="string" name="user[email]" placeholder="Email" value={this.state.email}
            onChange={this.emailChange} />
        </div>
        <div className="form-group">
        <input type="password" name="user[password]" placeholder="Password" value={this.state.password}
            onChange={this.passwordChange} />
        </div>
        <input className = "btn btn-default" type="submit" value="Sign In"/>
      </form>
    </div>;
  }
});

module.exports = NewSessionForm;
