var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var Header = require('./header.jsx');

var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

var SessionBackendActions = require('../actions/sessionBackendActions.js');
var UserBackendActions = require('../actions/userBackendActions.js');
var SubscriptionBackendActions = require('../actions/subscriptionBackendActions.js');
var ReviewBackendActions = require('../actions/reviewBackendActions.js');

//Test stuff obv
window.SessionStore = SessionStore;
window.UserStore = UserStore;
window.SubscriptionStore = SubscriptionStore;
window.ReviewStore = ReviewStore;
window.ReviewBackendActions = ReviewBackendActions;


var App = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser(),
      loggedIn: SessionStore.loggedIn(),
    };
  },
  componentWillMount: function() {
    SessionBackendActions.checkForUser();
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
    UserBackendActions.fetchAllUsers();
    SubscriptionBackendActions.fetchAllSubscriptions();
    ReviewBackendActions.fetchAllReviews();
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  onSessionChange: function() {
    this.setState({
      currentUser: SessionStore.currentUser(),
      loggedIn: SessionStore.loggedIn()
    });
  },
  // componentWillUnmount: function() {
  //   console.log("AppUnmounting");
  // },
  linkToTest: function(e) {
    e.preventDefault();
    BrowserHistory.push("/test");
  },

  render: function() {
    console.log("AppRender");
    return <div id='App'>
      <div><Header currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} /></div>
      <div>{this.props.children && React.cloneElement(this.props.children, {
               loggedIn: this.state.loggedIn,
               currentUser: this.state.currentUser
             })}</div>
    </div>;
  }
});






module.exports = App;
