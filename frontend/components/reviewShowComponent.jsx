var React = require('react');

var UserStore = require('../stores/user.js');
var SubscriptionStore = require('../stores/subscription.js');

var ReviewShowComponent = React.createClass({
  getInitialState: function() {
    return {
      author: UserStore.findById(this.props.review.author_id),
      subscription: SubscriptionStore.findById(this.props.review.subscription_id),
      frequency: this.props.review.frequency,
      rating: this.props.review.rating,
      comment: this.props.review.comment
    };
  },

  render: function() {
    return <img src={this.state.author.image} height="100" width="100"></img>;
  }
});

module.exports = ReviewShowComponent;
