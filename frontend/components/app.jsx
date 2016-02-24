var React = require('react');
var History = require('react-router').History;

var Header = require('./header.jsx');
var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var UserBackendActions = require('../actions/userBackendActions.js');

window.SessionStore = SessionStore;
window.UserStore = UserStore;

var App = React.createClass({
  mixins: [History],
  componentWillMount: function() {
    SessionBackendActions.checkForUser();
    UserBackendActions.fetchAllUsers();
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  onSessionChange: function() {
    if (SessionStore.loggedIn()) {
      this.history.push("users/" + SessionStore.currentUser().id);
    } else {
      this.history.push("/");
    }
  },
  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
