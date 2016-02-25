var React = require('react');
var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var BrowserHistory = require('react-router').browserHistory;

var UserBackendActions = require('../actions/userBackendActions.js');

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser(),
      currentShowUser: UserStore.findById(this.props.params.userId)
    };
  },
  // componentWillMount: function() {
  //   UserBackendActions.fetchAllUsers();
  // },
  componentDidMount: function() {
    this.userListenerToken = UserStore.addListener(this.userChange);
    this.sessionListenerToken = SessionStore.addListener(this.sessionChange);
  },
  componentWillUnmount: function() {
    this.userListenerToken.remove();
    this.sessionListenerToken.remove();
  },
  componentWillReceiveProps: function(newProps) {
    if(!isNumeric(this.props.params.userId)) {
      BrowserHistory.push("/");
    } else {
      this.onUserChange(newProps);
    }
  },
  onUserChange: function(newProps) {
    this.setState({
      currentShowUser: UserStore.findById(newProps.params.userId)
    });
  },
  userChange: function() {
    console.log("userShowPageRenderFromUserStoreChange");
    this.setState({
      currentShowUser: UserStore.findById(this.props.params.userId)
    });
  },
  sessionChange: function() {
    this.setState({
      currentUser: SessionStore.currentUser()
    });
  },
  render: function() {
    if (this.state.currentShowUser === undefined) {
      // Insert Loading Symbol Here -- waiting for the userstore to update
      return <div id="WAITING-FOR-LOAD"></div>;
    } else {
      return <div>
        <div className="col-md-4">
          <img src={this.state.currentShowUser.image} className="img-center"></img>
          <div>LEFT 1/3</div>
        </div>
        <div className="col-md-8">
          <div className="lead">{this.state.currentShowUser.first_name + " " + this.state.currentShowUser.last_name}</div>
          <div>Location: {this.state.currentShowUser.location}</div>
          <div>Email: {this.state.currentShowUser.email}</div>
          <div>Date of Birth: {this.state.currentShowUser.date_of_birth}</div>
          <div>RIGHT 2/3</div>
        </div>
      </div>;
    }
  }

});

module.exports = UserShowPage;
