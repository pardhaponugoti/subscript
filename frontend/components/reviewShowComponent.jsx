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
    return <div>
        <div>{ this.state.author.first_name + " " + this.state.author.last_name }</div>
        <img src={this.state.author.image} height="100" width="100"></img>
        <br/>
        <div>{this.state.subscription.name}</div>
        <div>{this.state.rating}</div>
        <div>{this.state.comment}</div>
    </div>;
  }
});

module.exports = ReviewShowComponent;
