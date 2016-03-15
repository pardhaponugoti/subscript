var React = require('react');
var Link = require('react-router').Link;
var TransitionGroup = require('react-addons-css-transition-group');
var Masonry = require('react-masonry-component');

var SubscriptionStore = require('../stores/subscription.js');

var SubscriptionGridComponent = require('./subscriptionGridComponent');

var SubscriptionIndex = React.createClass({
  getInitialState: function() {
    return {
      subscriptions: []
    };
  },
  componentDidMount: function() {
    this.setState({
      subscriptions: SubscriptionStore.all()
    });
    this.listenerToken = SubscriptionStore.addListener(this.onChange);
  },
  componentWillUnmount: function() {
    this.setState({
      subscriptions: []
    });
    this.listenerToken.remove();
  },

  onChange: function() {
    this.setState({
      subscriptions: SubscriptionStore.all()
    });
  },

  render: function() {
    return <div className="subscription-index">
      <h1 className="green-text"> Services </h1>
      <h3> All services you can review on the site</h3>
      <div className="col-md-offset-1 col-md-10">
        <Masonry >
          {this.state.subscriptions.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map(function(subscription) {
            return <SubscriptionGridComponent key={subscription.id} subscription={subscription}/>;
          })}
        </Masonry>
      </div>
    </div>;
  }
});

module.exports = SubscriptionIndex;
