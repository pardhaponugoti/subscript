var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var UserStore = require('../stores/user.js');
var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

// TAKES IN A REVIEW IN PROPS

var ReviewShowComponent = React.createClass({
  getInitialState: function() {
    return {
      author: UserStore.findById(this.props.review.author_id),
      subscription: SubscriptionStore.findById(this.props.review.subscription_id),
    };
  },

  openSubscriptionPage: function() {
    BrowserHistory.push("/subscriptions/" + this.state.subscription.id);
  },
  openAuthorPage: function() {
    BrowserHistory.push("/users/" + this.state.author.id);
  },

  render: function() {
    return <div>
        <img src={this.state.author.image} onClick={this.openAuthorPage}
          className="profile-link-img" height="100" width="100"></img>
        <span>{"★".repeat(this.props.review.rating)}</span>
        <span>{this.props.review.frequency}</span>
        <span><a onClick={this.openSubscriptionPage}>{this.state.subscription.name}</a></span>
        <br/>
        <div><a onClick={this.openAuthorPage}>{ this.state.author.first_name + " " + this.state.author.last_name }</a></div>
        <div>{this.props.review.comment}</div>
    </div>;
  }
});

module.exports = ReviewShowComponent;
