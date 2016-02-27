var React = require('react');
var Link = require('react-router').Link;

var SubscriptionStore = require('../stores/subscription.js');

var SubscriptionIndex = React.createClass({
  getInitialState: function() {
    return {
      subscriptions: SubscriptionStore.all()
    };
  },
  componentDidMount: function() {
    this.listenerToken = SubscriptionStore.addListener(this.onChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  onChange: function() {
    this.setState({
      subscriptions: SubscriptionStore.all()
    });
  },

  render: function() {
    return <div className="subscription-index">
      <h2>All Subscriptions</h2>
      <ul className="subscription-list">
        {this.state.subscriptions.map(function(subscription) {
          return <li><Link to={"/subscriptions/" + subscription.id}>{subscription.name}</Link></li>;
        })}
      </ul>
    </div>;
  }
});

module.exports = SubscriptionIndex;
