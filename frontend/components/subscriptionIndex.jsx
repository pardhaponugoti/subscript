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
      <ul className="subscription-list col-md-offset-2">
        {this.state.subscriptions.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }).map(function(subscription) {
          return <li className="subscription-index-li">
            <Link className="subscription-name-link" to={"/subscriptions/" + subscription.id}>
              <img className="subscription-logo-thumbnail" src={subscription.logo} height="50"/>
              <text>{subscription.name}</text>
            </Link>
        </li>;
        })}
      </ul>
    </div>;
  }
});

module.exports = SubscriptionIndex;
