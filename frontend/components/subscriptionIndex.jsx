var React = require('react');
var Link = require('react-router').Link;
var TransitionGroup = require('react-addons-css-transition-group');

var SubscriptionStore = require('../stores/subscription.js');

var SubscriptionGridComponent = require('./subscriptionGridComponent');

var SubscriptionIndex = React.createClass({
  getInitialState: function() {
    return {
      subscriptions: SubscriptionStore.all(),
      transitionAppear: true
    };
  },
  componentDidMount: function() {
    console.log("subscriptionIndexMounting");
    this.listenerToken = SubscriptionStore.addListener(this.onChange);
  },
  componentWillUnmount: function() {
    console.log("subscriptionIndexUnmounting");
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
      <div className="col-md-offset-1 col-md-10">
        <TransitionGroup transitionName="example" transitionAppear={this.state.transitionAppear}
          transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.state.subscriptions.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map(function(subscription) {
            return <SubscriptionGridComponent subscription={subscription}/>;
          })}
        </TransitionGroup>
      </div>
    </div>;
  }
});

module.exports = SubscriptionIndex;
