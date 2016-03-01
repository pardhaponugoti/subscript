var React = require('react');
var Infinite = require('react-infinite');
var TransitionGroup = require('react-addons-css-transition-group');

var ReviewStore = require('../stores/review.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var SplashPage = require('./splashPage.jsx');

var ReviewFeed = React.createClass({
  getInitialState: function() {
    return {
      unseenReviews: 0,
      newReviews: [],
      reviews: ReviewStore.sortedByAge(),
      isInfiniteLoading: true
    };
  },
  componentDidMount: function() {
    this.listenerToken = ReviewStore.addListener(this.onReviewChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  onReviewChange: function() {
    this.setState({
      unSeenReviews: ReviewStore.all().length - this.state.reviews.length,
      reviews: ReviewStore.sortedByAge()
    });
  },
  infiniteScrollComponent: function() {
    return <div>
      {this.state.reviews.map(function(review) {
        return <ReviewShowComponent review={review} key={review.id}/>;
      })}
    </div>;
  },
  render: function() {
    // debugger;
    if (this.state.reviews === undefined) {
      return <div>STAY TUNED</div>;
    } else {
      return <div className="review-feed">
        {!this.props.loggedIn ? <SplashPage/> : ""}
        <h2>Review Feed</h2>
          <ul className="container">
            {this.state.reviews.map(function(review) {
              return <ReviewShowComponent review={review} key={review.id}/>;
            })}
          </ul>
      </div>;
    }
  }
});

module.exports = ReviewFeed;
