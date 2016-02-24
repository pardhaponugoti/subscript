var React = require('react');

var SessionStore = require('../stores/session.js');

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser()
    };
  },

  render: function() {

  }

});

module.exports = UserShowPage;
