var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var SubscriptionShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentSubscription: SubscriptionStore.findById(parseInt(this.props.params.subscriptionId)),
      reviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId))
    };
  },
  componentWillUnmount: function() {
    this.subscriptionListenerToken.remove();
    this.reviewListenerToken.remove();
  },
  componentDidMount: function() {
    this.subscriptionListenerToken = SubscriptionStore.addListener(this.onSubscriptionChange);
    this.reviewListenerToken = ReviewStore.addListener(this.onReviewChange);
  },
  componentWillReceiveProps: function(newProps) {
    if(!isNumeric(newProps.params.subscriptionId)) {
      BrowserHistory.push("/");
    } else {
      this.subscriptionChange(newProps);
    }
  },

  subscriptionChange: function(newProps) {
    this.setState({
      currentSubscription: SubscriptionStore.findById(parseInt(newProps.params.subscriptionId))
    });
  },

  onSubscriptionChange: function() {
    this.setState({
      currentSubscription: SubscriptionStore.findById(parseInt(this.props.params.subscriptionId))
    });
  },
  onReviewChange: function() {
    this.setState({
      reviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId))
    });
  },

  render: function() {
    if(this.state.currentSubscription.name === undefined) {
      // INSERT LOADING SYMBOL HERE
      return <div>WAITING-FOR-LOAD</div>;
    } else {
      return <div>
        <h1><img src={this.state.currentSubscription.logo} width="256"/><text>{this.state.currentSubscription.name}</text>
        </h1>
        <h6>{this.state.currentSubscription.description}</h6>
        <ul>Reviews for {this.state.currentSubscription.name}
          {this.state.reviews.sort(function(a, b) {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(review) {
            return <li><ReviewShowComponent review={review} /></li>;
          })}
        </ul>
      </div>;
    }
  }

});

module.exports = SubscriptionShowPage;
