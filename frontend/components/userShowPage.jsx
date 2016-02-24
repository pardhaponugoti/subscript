var React = require('react');
var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var History = require('react-router').History;

var UserShowPage = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      currentUser: UserStore.findById(this.props.params.userId)
    };
  },
  onChange: function(newProps) {
    this.setState({
      currentUser: UserStore.findById(newProps.params.userId)
    });
  },
  userChange: function() {
    this.setState({
      currentUser: UserStore.findById(this.props.params.userId)
    });
  },
  componentDidMount: function() {
    this.listenerToken = UserStore.addListener(this.userChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  componentWillReceiveProps: function(newProps) {
    if(!isNumeric(this.props.params.userId)) {
      this.history.push("/");
    } else {
      this.onChange(newProps);
    }
  },
  render: function() {
    if (this.state.currentUser === undefined) {
      // Insert Loading Symbol Here
      return <div></div>;
    } else {
      return <div>
        <div className="col-md-4">
          <img src={this.state.currentUser.image} className="img-center"></img>
          <div>LEFT 1/3</div>
        </div>
        <div className="col-md-8">
          <div>{this.state.currentUser.first_name + " " + this.state.currentUser.last_name}</div>
          <div>Location: {this.state.currentUser.location}</div>
          <div>Email: {this.state.currentUser.email}</div>
          <div>RIGHT 2/3</div>
        </div>
      </div>;
    }
  }

});

module.exports = UserShowPage;

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
