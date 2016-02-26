var React = require('react');

var ReviewStore = require('../stores/review.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');

var ReviewFeed = React.createClass({
  getInitialState: function() {
    return {
      unseenReviews: 0,
      reviews: ReviewStore.sortedByAge()
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
  render: function() {
    console.log("reviewFeedRender");
    if (this.state.reviews === undefined) {
      return <div>STAY TUNED</div>;
    } else {
      return <div className="review-feed">
        <h2>Review Feed</h2>
        {this.state.reviews.map(function(review) {
          return <ReviewShowComponent review={review}/>;
        })}
      </div>;
    }
  }
});

module.exports = ReviewFeed;
