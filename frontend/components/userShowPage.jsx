var React = require('react');

var SessionStore = require('../stores/session.js');

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser()
    };
  },
  sessionChange: function() {
    this.setState({
      currentUser: SessionStore.currentUser()
    });
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.sessionChange);
  },
  render: function() {
    return <div>
      <div className="col-md-4">
        <img src={this.state.currentUser.image} className="img-center"></img>
        <div>LEFT 1/3</div>
      </div>
      <div className="col-md-8">
        <div>{this.state.currentUser.first_name + " " + this.state.currentUser.last_name}</div>
        <div>Location: {this.state.currentUser.location}</div>
        <div>RIGHT 2/3</div>
      </div>
    </div>;
  }

});

module.exports = UserShowPage;
