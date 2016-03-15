var React = require('react');
var Infinite = require('react-infinite');
var InfiniteScroll = require('react-infinite-scroll')(React);
var TransitionGroup = require('react-addons-css-transition-group');
var BrowserHistory = require('react-router').browserHistory;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var ReviewStore = require('../stores/review.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var SplashPage = require('./splashPage.jsx');
var SubscriptionIndex = require('./subscriptionIndex.jsx');

var NewReviewForm = require('./newReviewForm.jsx');

var ReviewFeed = React.createClass({
  getInitialState: function() {
    return {
      reviews: ReviewStore.sortedByAge(),
      shownReviews: ReviewStore.sortedByAge().slice(0, 30),
      modalIsOpen: false
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

  openModal: function() {
    this.setState({
      modalIsOpen: true
    });
  },
  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
  },


  render: function() {
    if (this.state.reviews === undefined) {
      return <div className="loading-container">
        <div className="jawn"></div>
      </div>;
    } else {
      if (!this.props.loggedIn) {
        return <SplashPage />;
      } else {
        return <div className="row review-feed">
          <div className="container">
            <br/>
            <h1 className="green-text"> Welcome to subscript!</h1>
            <h4> This is a site for you to review your paid subscriptions and services, such as Uber, Netflix, and Spotify. </h4>
            <div className="col-md-10 col-sm-10 review-feed-title">
              <h3> Below are the most recent reviews from our users from around the universe </h3>
            </div>
            {this.props.startTourCallback ? <div className="col-md-2 col-sm-2 right-justify">
              <button onClick={this.props.startTourCallback} className="btn-lg tour-btn">Take a Tour!</button>
            </div> : null }
          </div>
          <br/>
          <br/>
          <div className="col-md-2 col-sm-4 sidebar-div">
            <ul id="sidebar" className="nav nav-stacked">
                <li className="sidebar-li open-profile" onClick={this.openProfile}>Profile</li>
                <li className="sidebar-li" onClick={this.openStatistics}>Statistics</li>
                <li className="sidebar-li" onClick={this.openServices}>Services</li>
                <li className="sidebar-li write-new-review" onClick={this.openModal}>Write A Review</li>
                  <Modal bsSize="lg"
                    show={this.state.modalIsOpen}
                    onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Write a New Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <NewReviewForm currentUser={this.props.currentUser} closeModalCallback={this.closeModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.closeModal}>Never Mind</Button>
                    </Modal.Footer>
                  </Modal>
            </ul>
          </div>
          <div className="col-md-8 col-sm-7 col-md-offset-1">
            { this.infiniteScrollComponent() }
          </div>
        </div>;
      }
    }
  }
});

module.exports = ReviewFeed;

// <h5> Be sure to check out the <a onClick={this.openStatistics}>Statistics</a> Page to see summary data about our users and the <a onClick={this.openServices}>Services</a> Page to see the services that you can review. </h5>

// <div className="col-md-12 col-sm-12">
//   <SubscriptionIndex/>
// </div>
