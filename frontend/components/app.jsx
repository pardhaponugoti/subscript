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
  getInitialState: function() {
    return {
      loggedIn: SessionStore.loggedIn()
    };
  },
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
    console.log(SessionStore.loggedIn());
    if (SessionStore.loggedIn()) {
      this.setState({loggedIn: SessionStore.loggedIn()});
      this.history.push("users/" + SessionStore.currentUser().id);
    } else {
      this.setState({loggedIn: SessionStore.loggedIn()});
      this.history.push("/");
    }
  },
  render: function() {
    if (this.state.loggedIn) {
      return <div id='App'>
        <div><Header currentUser={SessionStore.currentUser()} /></div>
        <div>{this.props.children}</div>
      </div>;
    } else {
      return <div id='App'>
        <div><Header currentUser={SessionStore.currentUser()} /></div>
        <div class="modal fade" id="sign-in-modal">
          <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  <h4 class="modal-title">Log-in</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input class="form-control" id="exampleInputEmail1" placeholder="Enter email" type="email"/>
                </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
              <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password"/>
              </div>
                  <p class="text-right"><a href="#">Forgot password?</a></p>
                </div>
                <div class="modal-footer">
                  <a href="#" data-dismiss="modal" class="btn">Close</a>
                  <a href="#" class="btn btn-primary">Log-in</a>
                </div>
              </div>
            </div>
        </div>
        <div>{this.props.children}</div>
      </div>;
    }
  }
});


module.exports = App;
