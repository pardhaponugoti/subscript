var React = require('react');
var Infinite = require('react-infinite');
var InfiniteScroll = require('react-infinite-scroll')(React);
var TransitionGroup = require('react-addons-css-transition-group');

var ReviewStore = require('../stores/review.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var SplashPage = require('./splashPage.jsx');

var ReviewFeed = React.createClass({
  getInitialState: function() {
    return {
      reviews: ReviewStore.sortedByAge(),
      shownReviews: ReviewStore.sortedByAge().slice(0, 30)
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
      reviews: ReviewStore.sortedByAge(),
      shownReviews: ReviewStore.sortedByAge().slice(0, 30)
    });
  },

  loadReviews: function(pageNumber) {
    this.setState({
      shownReviews: this.state.reviews.slice(0, 30*(pageNumber + 1))
    });
  },
  infiniteScrollComponent: function() {
    return <InfiniteScroll
      pageStart={0}
      loadMore={this.loadReviews}
      hasMore={this.state.reviews.length > this.state.shownReviews.length}>
      {this.state.shownReviews.map(function(review) {
        return <ReviewShowComponent review={review} key={review.id}/>;
      })}
    </InfiniteScroll>;
  },

  render: function() {

    if (this.state.reviews === undefined) {
      return <div>STAY TUNED</div>;
    } else {
      if (!this.props.loggedIn) {
        return <SplashPage />;
      } else {
        return <div className="col-md-offset-1 col-md-10 review-feed">
          <h2>Recent Reviews</h2>
          { this.infiniteScrollComponent() }
        </div>;
      }
    }
  }
});

module.exports = ReviewFeed;
