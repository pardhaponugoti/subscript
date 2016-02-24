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
    SessionStore.addListener(this.onSessionChange);
  },
  onSessionChange: function() {
    this.history.push('/');
  },
  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
