var React = require('react');

var SessionStore = require('../stores/session.js');

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser()
    };
  },

  render: function() {
    return <div>
      <div className="col-md-4">
        LEFT 1/3
      </div>
      <div className="col-md-8">
        RIGHT 2/3
      </div>
    </div>;
  }

});

module.exports = UserShowPage;
