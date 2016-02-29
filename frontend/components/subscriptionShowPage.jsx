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
      return <div className="container">
        <div className="row">
          <div className="col-md-3"><h1><img className="subscription-logo" src={this.state.currentSubscription.logo} height="256"/></h1></div>
          <div>
            <h1>{this.state.currentSubscription.name}</h1>
            <h4><a href={this.state.currentSubscription.url}>{this.state.currentSubscription.url}</a></h4>
            <h5>{this.state.currentSubscription.description}</h5>
          </div>
        </div>
        <h4>Reviews for {this.state.currentSubscription.name}</h4>
        <ul className="container subscription-review-ul" >
          {this.state.reviews.sort(function(a, b) {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(review) {
            return <ReviewShowComponent review={review} />;
          })}
        </ul>
      </div>;
    }
  }

});

module.exports = SubscriptionShowPage;
