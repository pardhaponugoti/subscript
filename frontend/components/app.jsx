var React = require('react');
var History = require('react-router').History;
var SessionStore = require('../stores/session.js');
var SessionActions = require('../actions/sessionActions.js');

window.SessionStore = SessionStore;

var App = React.createClass({
  mixins: [History],
  componentDidMount: function() {
    if (!SessionStore.loggedIn()) {
      this.history.pushState(null, 'session/new');
    }
    SessionStore.addListener(this.onSessionChange);
  },
  onSessionChange: function() {
    debugger;
    this.history.pushState(null, '/');
  },
  render: function() {
    return <div id='App'>{this.props.children}</div>;

  }
});


module.exports = App;
