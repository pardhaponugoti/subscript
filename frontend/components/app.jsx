var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/session.js');
var SessionActions = require('../actions/sessionActions.js');
var Header = require('./header.jsx');

// window.SessionStore = SessionStore;
// window.SessionActions = SessionActions;

var App = React.createClass({
  mixins: [History],
  componentWillMount: function() {
    SessionActions.checkForUser();
  },
  componentDidMount: function() {
    SessionStore.addListener(this.onSessionChange);
    if (!SessionStore.loggedIn()) {
      this.history.push('#/session/new');
    }
  },
  onSessionChange: function() {
    this.history.push('#/');
  },
  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
