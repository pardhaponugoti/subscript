var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var UserStore = require('../stores/user.js');
var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var UserBackendActions = require('../actions/userBackendActions.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var NewReviewForm = require('./newReviewForm.jsx');


function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentShowUser: UserStore.findById(this.props.params.userId),
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId),
      newReviewModalIsOpen: false
    };
  },
  // componentWillMount: function() {
  //   UserBackendActions.fetchAllUsers();
  // },
  componentDidMount: function() {
    this.userListenerToken = UserStore.addListener(this.userChange);
    this.reviewListenerToken = ReviewStore.addListener(this.reviewChange);
  },
  componentWillUnmount: function() {
    this.userListenerToken.remove();
    this.reviewListenerToken.remove();
  },
  componentWillReceiveProps: function(newProps) {
    if(!isNumeric(this.props.params.userId)) {
      BrowserHistory.push("/");
    } else {
      this.onUserChange(newProps);
    }
  },
  onUserChange: function(newProps) {
    this.setState({
      currentShowUser: UserStore.findById(newProps.params.userId),
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId)
    });
  },


  userChange: function() {
    console.log("userShowPageRenderFromUserStoreChange");
    this.setState({
      currentShowUser: UserStore.findById(this.props.params.userId)
    });
  },
  reviewChange: function() {
    this.setState({
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId)
    });
  },

  toggleModal: function() {
    this.setState({
      newReviewModalIsOpen: !this.state.newReviewModalIsOpen
    });
  },
  close: function() {
    this.setState({
      newReviewModalIsOpen: false
    });
  },

  render: function() {
    if (this.state.currentShowUser === undefined || this.state.currentShowUserReviews === undefined) {
      // Insert Loading Symbol Here -- waiting for the userstore to update
      return <div id="WAITING-FOR-LOAD"></div>;
    } else {
      return <div>
        <div className="col-md-4">
          <img src={this.state.currentShowUser.image} className="img-center"></img>
          <br/>
          <ul>Subscriptions
            {this.state.currentShowUserReviews.map(function(review) {
              return <li>{SubscriptionStore.findById(review.subscription_id).name}</li>;
            })}
          </ul>
          <div>LEFT 1/3</div>
        </div>
        <div className="col-md-8">
          <div className="lead">{this.state.currentShowUser.first_name + " " + this.state.currentShowUser.last_name}</div>
          <div>Location: {this.state.currentShowUser.location}</div>
          <div>Email: {this.state.currentShowUser.email}</div>
          <div>Date of Birth: {this.state.currentShowUser.date_of_birth}</div>
          <div>RIGHT 2/3</div>
          <br/>
            <button className="btn btn-default btn-sm" onClick={this.toggleModal}>CreateNewReview</button>
            <Modal show={this.state.newReviewModalIsOpen} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Write a New Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewReviewForm currentUser={this.props.currentUser} closeModalCallback={this.close}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Never Mind</Button>
              </Modal.Footer>
            </Modal>
          <br/>
          <br/>
          <br/>
          <div>
            { this.state.currentShowUserReviews.map(function(userReview) {
              return <ReviewShowComponent review={userReview} key={userReview.id}/>;
            })}
          </div>
        </div>
      </div>;
    }
  }

});

module.exports = UserShowPage;
