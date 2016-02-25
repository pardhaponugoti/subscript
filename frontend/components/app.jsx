var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var Header = require('./header.jsx');

var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var SubscriptionStore = require('../stores/subscription.js');

var SessionBackendActions = require('../actions/sessionBackendActions.js');
var UserBackendActions = require('../actions/userBackendActions.js');
var SubscriptionBackendActions = require('../actions/subscriptionBackendActions.js');

window.SessionStore = SessionStore;
window.UserStore = UserStore;
window.SubscriptionStore = SubscriptionStore;


var App = React.createClass({
  componentWillMount: function() {
    console.log("appwillmount");
    SessionBackendActions.checkForUser();
  },
  componentDidMount: function() {
    UserBackendActions.fetchAllUsers();
    SubscriptionBackendActions.fetchAllSubscriptions();
  },
  // componentWillUnmount: function() {
  //   console.log("AppUnmounting");
  // },
  linkToTest: function(e) {
    e.preventDefault();
    BrowserHistory.push("test");
  },

  render: function() {
    return <div id='App'>
      <div><Header /></div>
      <button onClick={this.linkToTest}>test</button>
      <div>HOMEPAGE</div>
      <div>{this.props.children}</div>
    </div>;
  }
});


module.exports = App;
