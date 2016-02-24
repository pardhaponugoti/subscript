var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/session.js');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var Header = require('./header.jsx');

window.SessionStore = SessionStore;

var App = React.createClass({
  mixins: [History],
  componentWillMount: function() {
    SessionBackendActions.checkForUser();
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  onSessionChange: function() {
    if (SessionStore.loggedIn()) {
      this.history.push("users/" + SessionStore.currentUser().id);
    } else {
      this.history.push("/");
    }
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
