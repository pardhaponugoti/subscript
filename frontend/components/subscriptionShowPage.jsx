var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Modal = require('react-bootstrap').Modal;

var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var Chart = require('./chart.jsx');

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var SubscriptionShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentSubscription: SubscriptionStore.findById(parseInt(this.props.params.subscriptionId)),
      reviews: ReviewStore.findBySubscriptionId(parseInt(this.props.params.subscriptionId)),
      showReviews: true,
      showCharts: false,
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
      reviews: ReviewStore.findBySubscriptionId(parseInt(newProps.params.subscriptionId))
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

  reviewsUl: function() {
    return <ul className="container-fluid subscription-review-ul" >
      {this.state.reviews.sort(function(a, b) {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(review) {
        return <ReviewShowComponent key={review.id} review={review} />;
      })}
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

  userButtons: function(obj, id) {
    if (id !== undefined) {
      var alreadyMadeReview = false;
      obj.state.reviews.forEach(function(review) {
        if (review.author_id === id) {
          alreadyMadeReview = true;
        }
      });

      if (alreadyMadeReview) {
        return <button>EDIT REVIEW BUTTON</button>;
      } else {
        return <div>
          <button className="btn create-review-btn btn-sm" onClick={this.toggleModal}>Create New Review</button>
          <Modal bsSize="lg"
            show={this.state.ModalIsOpen}
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
    if(this.state.currentSubscription.name === undefined || this.props === undefined) {
      // INSERT LOADING SYMBOL HERE
      return <div>WAITING-FOR-LOAD</div>;
    } else {
      var input;
      if (this.state.showReviews) {
        input = this.reviewsUl();
      } else if (this.state.showCharts) {
        input= <Chart subscription={this.state.currentSubscription} reviews={this.state.reviews}/>;
      }
      return <div className="container">
        <div className="row">
          <div className="col-md-4"><h1><img className="subscription-logo" src={this.state.currentSubscription.logo} height="256"/></h1></div>
          <div className="col-md-8">
            <h1>{this.state.currentSubscription.name}</h1>
            { this.userButtons(this, this.props.currentUser.id) }
            <h4><a href={"http://" + this.state.currentSubscription.url}>{this.state.currentSubscription.url}</a></h4>
            <h5>{this.state.currentSubscription.description}</h5>
          </div>
        </div>
        <ul className="nav nav-tabs list-inline borderless" role="tablist">
          <li key="1" className={this.state.showReviews ? "active" : ""}><a onClick={this.showReviews}>Reviews</a></li>
          <li key="2" className={this.state.showCharts ? "active" : ""}><a onClick={this.showCharts}>Charts<sup>beta</sup></a></li>
        </ul>
        <div className="subscription-show-container">
          {input}
        </div>
      </div>;
    }
  }

});

module.exports = SubscriptionShowPage;
