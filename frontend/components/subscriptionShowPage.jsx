var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var InfiniteScroll = require('react-infinite-scroll')(React);

var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var EditReviewForm = require('./editReviewForm.jsx');
var NewReviewForm = require('./newReviewForm.jsx');
var ReviewShowComponent = require('./reviewShowComponent.jsx');
var SubscriptionChart = require('./subscriptionChart.jsx');

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var SubscriptionShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentSubscription: SubscriptionStore.findById(parseInt(this.props.params.subscriptionId)),
      reviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId)),
      shownReviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId)).slice(0, 30),
      showReviews: false,
      showCharts: true,
      modalIsOpen: false
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
      currentSubscription: SubscriptionStore.findById(parseInt(newProps.params.subscriptionId)),
      reviews: ReviewStore.findBySubscriptionId(parseInt(newProps.params.subscriptionId)),
      shownReviews: ReviewStore.findBySubscriptionId(parseInt(newProps.params.subscriptionId)).slice(0, 30)
    });
  },

  onSubscriptionChange: function() {
    this.setState({
      currentSubscription: SubscriptionStore.findById(parseInt(this.props.params.subscriptionId))
    });
  },
  onReviewChange: function() {
    this.setState({
      reviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId)),
      shownReviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId)).slice(0, 30)
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
      {this.state.shownReviews.sort(function(a, b) {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(review) {
        return <ReviewShowComponent review={review} key={review.id}/>;
      })}
    </InfiniteScroll>;
  },
  reviewsUl: function() {
    return <ul className="container-fluid subscription-review-ul" >
      {this.infiniteScrollComponent()}
    </ul>;
  },

  showReviews: function(e) {
    e.preventDefault();
    // e.target.toggleClass("active");
    this.setState({
      showReviews: true,
      showCharts: false
    });
  },
  showCharts: function(e) {
    e.preventDefault();
    // e.target.toggleClass("active");
    this.setState({
      showCharts: true,
      showReviews: false
    });
  },

  toggleModal: function() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  },
  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
  },

  userButtons: function() {
    if ( this.props.loggedIn ) {
      var alreadyMadeReview = false;
      var currentReview = {};
      var self = this;
      this.state.reviews.forEach(function(review) {
        if (review.author_id === self.props.currentUser.id) {
          alreadyMadeReview = true;
          currentReview = review;
        }
      });

      if (alreadyMadeReview) {
        return <div>
          <button className="btn btn-default btn-sm edit-review-btn" onClick={this.toggleModal} >Edit Review</button>
          <Modal
            show={this.state.modalIsOpen}
            onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditReviewForm currentUser={this.props.currentUser} review={currentReview} closeModalCallback={this.closeModal}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Never Mind</Button>
            </Modal.Footer>
          </Modal>
        </div>;
      } else {
        return <div>
          <button className="btn create-review-btn btn-sm" onClick={this.toggleModal} >Review {this.state.currentSubscription.name}</button>
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
        </div>;
      }
    } else {
      return null;
    }
  },

  render: function() {
    if(this.state.currentSubscription.name === undefined || this.props === undefined || this.state.reviews === undefined) {
      // INSERT LOADING SYMBOL HERE
      return <div>WAITING-FOR-LOAD</div>;
    } else {
      var input;
      if (this.state.showReviews) {
        input = this.reviewsUl();
      } else if (this.state.showCharts) {
        input= <SubscriptionChart subscription={this.state.currentSubscription} reviews={this.state.reviews}/>;
      }
      return <div className="container">
        <div className="row">
          <div className="col-md-4"><h1><img className="subscription-logo" src={this.state.currentSubscription.logo} height="256"/></h1></div>
          <div className="col-md-8">
            <h1>{this.state.currentSubscription.name}</h1>
            { this.userButtons() }
            <h4><a href={"http://" + this.state.currentSubscription.url}>{this.state.currentSubscription.url}</a></h4>
            <h5>{this.state.currentSubscription.description}</h5>
          </div>
        </div>
        <ul className="nav nav-tabs list-inline borderless" role="tablist">
          <li key="1" className={this.state.showCharts ? "active" : ""}><a onClick={this.showCharts}>Charts</a></li>
          <li key="2" className={this.state.showReviews ? "active" : ""}><a onClick={this.showReviews}>Reviews</a></li>
        </ul>
        <div className="subscription-show-container container">
          {input}
        </div>
      </div>;
    }
  }

});

module.exports = SubscriptionShowPage;


// {this.state.reviews.sort(function(a, b) {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(review) {
//   return <ReviewShowComponent key={review.id} review={review} />;
// })}
