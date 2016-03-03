var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Joyride = require('react-joyride');

var Header = require('./header.jsx');

var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

var SessionBackendActions = require('../actions/sessionBackendActions.js');
var UserBackendActions = require('../actions/userBackendActions.js');
var SubscriptionBackendActions = require('../actions/subscriptionBackendActions.js');
var ReviewBackendActions = require('../actions/reviewBackendActions.js');

var ReviewFeed = require('./reviewFeed.jsx');

//Test stuff obv
window.SessionStore = SessionStore;
window.UserStore = UserStore;
window.SubscriptionStore = SubscriptionStore;
window.ReviewStore = ReviewStore;

var App = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser(),
      loggedIn: SessionStore.loggedIn(),
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: []
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
  linkToTest: function(e) {
    e.preventDefault();
    this.setState({
      ready: !this.state.ready
    });
  },

  _addSteps: function(steps) {
      var joyride = this.refs.joyride;

      if (!Array.isArray(steps)) {
          steps = [steps];
      }

      if (!steps.length) {
          return false;
      }

      this.setState({
        steps: this.state.steps.concat(joyride.parseSteps(steps))
      });
  },

  _addTooltip: function(data) {
      this.refs.joyride.addTooltip(data);
  },

  _stepCallback: function(step) {
      console.log('••• stepCallback', step);
  },

  _completeCallback: function(steps, skipped) {
      console.log('••• completeCallback', steps, skipped);
      $("body").css({
        "padding-top": "50px"
      });
      this.setState({
        ready: false,
        steps: []
      });
  },

  _onClickSwitch: function(e) {
    e.preventDefault();
    var el = e.currentTarget,
      state = {};

    if (el.dataset.key === 'joyrideType') {
      this.refs.joyride.reset();

      setTimeout(function() {
        this.refs.joyride.start();
      }, 300);

      state.joyrideType = e.currentTarget.dataset.type;
    }

    if (el.dataset.key === 'joyrideOverlay') {
      state.joyrideOverlay = el.dataset.type === 'active';
    }

    this.setState({
      joyrideOverlay: state.joyrideOverlay,
      joyrideType: state.joyrideType
    });
  },

  startTour: function(e) {
    e.preventDefault();
    this.setState({
      ready: !this.state.ready
    });
  },

  render: function() {
    console.log("App ready: " + this.state.ready);
    if (this.state.ready) {
      $("body").css({
        "padding-top": "0px"
      });
      setTimeout(function() {
        this.refs.joyride.start();
      }.bind(this), 2500);
      return <div id='App'>
        <Joyride  ref="joyride"
          debug={true}
          steps={this.state.steps}
          type={this.state.joyrideType}
          showSkipButton={true}
          showOverlay={this.state.joyrideOverlay}
          stepCallback={this._stepCallback}
          completeCallback={this._completeCallback}
          scrollToSteps={false}/>
        <div><Header currentUser={this.state.currentUser}
          loggedIn={this.state.loggedIn}
          joyrideType={this.state.joyrideType}
          joyrideOverlay={this.state.joyrideOverlay}
          onClickSwitch={this._onClickSwitch}
          addSteps={this._addSteps}
          addTooltip={this._addTooltip} />
        </div>
        <div className="fifty-pixels"></div>
        <ReviewFeed currentUser={this.state.currentUser}
          loggedIn={this.state.loggedIn}
          joyrideType={this.state.joyrideType}
          joyrideOverlay={this.state.joyrideOverlay}
          onClickSwitch={this._onClickSwitch}
          addSteps={this._addSteps}
          addTooltip={this._addTooltip} />
      </div>;
    } else {
      return <div id='App'>
          <div><Header currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} /></div>
          <div>{this.props.children && React.cloneElement(this.props.children, {
                   loggedIn: this.state.loggedIn,
                   currentUser: this.state.currentUser,
                   startTourCallback: this.startTour
                 })}</div>
        </div>;
      }
  }
});

module.exports = App;
