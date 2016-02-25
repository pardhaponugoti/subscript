var React = require('react');

var ReviewStore = require('../review/session.js');
var BrowserHistory = require('react-router').browserHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var NewReviewForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      subscriptionId: null,
      rating: 0,
      comment: ""
    };
  },


  render: function() {
    return <form>
      <div>
        <input
          type='text'
          id='pokemon_name'
          valueLink={this.linkState("subscriptionId")} 
        />
      </div>
    </form>;
  }
});
