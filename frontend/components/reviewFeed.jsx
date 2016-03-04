var React = require('react');
var Infinite = require('react-infinite');
var InfiniteScroll = require('react-infinite-scroll')(React);
var TransitionGroup = require('react-addons-css-transition-group');
var BrowserHistory = require('react-router').browserHistory;

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
    console.log("Review Feed Mount");
    this.listenerToken = ReviewStore.addListener(this.onReviewChange);
    if (this.props.addSteps) {
      setTimeout(function() {
      this.props.addSteps([
        {
          title: 'Reviews',
          text: "Check out user reviews from around the galaxy!",
          selector: '.review-show',
          position: 'top',
          type: 'hover',
          style: {
            backgroundColor: '#fff',
            mainColor: '#9BBEA8',
            color: '#000',
            borderRadius: '1rem',
            textAlign: 'center',
            width: '40rem'
          }
        },
        {
          title: 'Profile',
          text: "Preview your profile, write and edit reviews, and edit your information",
          selector: '.open-profile',
          position: 'right',
          type: 'hover',
          style: {
            backgroundColor: '#fff',
            mainColor: '#9BBEA8',
            color: '#000',
            borderRadius: '1rem',
            textAlign: 'center',
            width: '40rem'
          }
        },
        {
          title: 'Write a Review',
          text: "Review a subscription or service that you use!",
          selector: '.write-new-review',
          position: 'right',
          type: 'hover',
          style: {
            backgroundColor: '#fff',
            mainColor: '#9BBEA8',
            color: '#000',
            borderRadius: '1rem',
            textAlign: 'center',
            width: '40rem'
          }
        }
        ]);
      }.bind(this), 100);
    }
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

  openTour: function() {
    BrowserHistory.push("/users/" + this.props.currentUser.id);
  },
  openProfile: function() {
    BrowserHistory.push("/users/" + this.props.currentUser.id);
  },
  openStatistics: function() {
    BrowserHistory.push("/statistics");
  },
  openServices: function() {
    BrowserHistory.push("/subscriptions");
  },


  render: function() {
    if (this.state.reviews === undefined) {
      return <div>STAY TUNED</div>;
    } else {
      if (!this.props.loggedIn) {
        return <SplashPage />;
      } else {
        return <div className="row review-feed">
          <div className="container">
            <div className="col-md-5 review-feed-title">
              <h1>Recent Reviews</h1>
            </div>
            {this.props.startTourCallback ? <div className="col-md-7 right-justify">
              <button onClick={this.props.startTourCallback} className="btn btn-default btn-lg tour-btn">Take a Quick Tour</button>
            </div> : null }
          </div>
          <br/>
          <br/>
          <br/>
          <div className="col-md-2 col-sm-4 sidebar-div">
            <ul id="sidebar" className="nav nav-stacked">
              Σ
                <li className="sidebar-li open-profile" onClick={this.openProfile}>Profile</li>
                <li className="sidebar-li" >Your Subscriptions<span className="caret"></span></li>
                <li className="sidebar-li" onClick={this.openStatistics}>Statistics</li>
                <li className="sidebar-li" onClick={this.openServices}>Services</li>
                <li className="sidebar-li write-new-review" >Write A Review</li>
            </ul>
          </div>
          <div className="col-md-9 col-sm-8">
            { this.infiniteScrollComponent() }
          </div>
        </div>;
      }
    }
  }
});

module.exports = ReviewFeed;
