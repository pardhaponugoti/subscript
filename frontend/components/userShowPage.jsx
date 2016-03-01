var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;

var UserStore = require('../stores/user.js');
var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var UserBackendActions = require('../actions/userBackendActions.js');
var ReviewBackendActions = require('../actions/reviewBackendActions.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var NewReviewForm = require('./newReviewForm.jsx');
var EditReviewForm = require('./editReviewForm.jsx');


function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var backDropStyles = {
  base: {
    background: 'rgba(0, 0, 0, .7)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.4s',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  open: {
    opacity: 1,
    visibility: 'visible'
  }
};

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentShowUser: UserStore.findById(this.props.params.userId),
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId),
      newReviewModalIsOpen: false,
      editReviewModalIsOpen: false
    };
  },
  componentDidMount: function() {
    this.userListenerToken = UserStore.addListener(this.userChange);
    this.reviewListenerToken = ReviewStore.addListener(this.reviewChange);
    this.subscriptionListenerToken = SubscriptionStore.addListener(this.subscriptionChange);
  },
  componentWillUnmount: function() {
    this.userListenerToken.remove();
    this.reviewListenerToken.remove();
  },
  componentWillReceiveProps: function(newProps) {
    if(!isNumeric(newProps.params.userId)) {
      BrowserHistory.push("/");
    } else {
      this.onUserChange(newProps);
    }
  },
  onUserChange: function(newProps) {
    this.setState({
      currentShowUser: UserStore.findById(newProps.params.userId),
      currentShowUserReviews: ReviewStore.findByUserId(newProps.params.userId),
      newReviewModalIsOpen: false,
      editReviewModalIsOpen: false
    });
  },


  userChange: function() {
    console.log("userShowPageRenderFromUserStoreChange");
    this.setState({
      currentShowUser: UserStore.findById(this.props.params.userId)
    });
  },
  reviewChange: function() {
    console.log("setting state for user show page");
    this.setState({
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId)
    });
  },
  subscriptionChange: function() {
    this.setState({
      newReviewModalIsOpen: false
    });
  },

  toggleNewReviewModal: function() {
    $("#App").css({
      "-webkit-filter": "blur(5px)",
      "filter": "blur(5px)",
      "-o-filter": "blur(5px)",
      "-moz-filter": "blur(5px)"
    });
    this.setState({
      newReviewModalIsOpen: !this.state.newReviewModalIsOpen
    });
  },
  closeNewReviewModal: function() {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
    this.setState({
      newReviewModalIsOpen: false
    });
  },
  // toggleEditReviewModal: function() {
  //   this.setState({
  //     editReviewModalIsOpen: !this.state.editReviewModalIsOpen
  //   });
  // },
  // closeEditReviewModal: function() {
  //   this.setState({
  //     editReviewModalIsOpen: false
  //   });
  // },
  // deleteReview: function(reviewId) {
  //   ReviewBackendActions.deleteReview(reviewId);
  // },

  openSubscriptionPage: function(id) {
    BrowserHistory.push("/subscriptions/" + id);
  },

  render: function() {
    console.log("render show page");
    if (this.state.currentShowUser === undefined || this.state.currentShowUserReviews === undefined) {
      // Insert Loading Symbol Here -- waiting for the userstore to update
      return <div id="WAITING-FOR-LOAD"></div>;
    } else {
      var self = this;
      return <div className="user-show-page">
        <div className="col-md-3 col-md-offset-1 container-fluid">
          <img src={this.state.currentShowUser.image} className="profile-img"></img>
          <br/>
          <ul><h3>Subscriptions</h3>
            {this.state.currentShowUserReviews.map(function(review) {
              return <li key={review.subscription_id}><Link className="subscription-name-link" to={"/subscriptions/" + review.subscription_id}>
                {SubscriptionStore.findById(review.subscription_id).name}</Link></li>;
            })}
          </ul>
        </div>
        <div className="col-md-7 container-fluid profile-info">
          <div className="profile-name">{this.state.currentShowUser.first_name + " " + this.state.currentShowUser.last_name}
          </div>
            { parseInt(this.props.params.userId) === parseInt(this.props.currentUser.id) ?
              <div className="small"><Link to={"/users/" + this.props.params.userId + "/edit"}>Edit Profile</Link></div> : "" }
          <br/>
          <div>Location: {this.state.currentShowUser.location}</div>
          <div>Email: {this.state.currentShowUser.email}</div>
          <div>Date of Birth: {this.state.currentShowUser.date_of_birth}</div>
          <br/>
            { parseInt(this.props.params.userId) === parseInt(this.props.currentUser.id) ?
              <button className="btn create-review-btn btn-sm" onClick={this.toggleNewReviewModal}>Create New Review</button> : "" }
            <Modal bsSize="lg"
              show={this.state.newReviewModalIsOpen}
              onHide={this.closeNewReviewModal}>
              <Modal.Header closeButton>
                <Modal.Title>Write a New Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewReviewForm currentUser={this.props.currentUser} closeModalCallback={this.closeNewReviewModal}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeNewReviewModal}>Never Mind</Button>
              </Modal.Footer>
            </Modal>
          <br/>
          <br/>
          <br/>
          <h3>Reviews</h3>
          <ul className="profile-reviews-ul container-fluid">
            { this.state.currentShowUserReviews.sort(function(a, b)
              {return new Date(b.updated_at) - new Date(a.updated_at);}).map(function(userReview) {
                return <ReviewShowComponent userId={self.props.params.userId} currentUser={self.props.currentUser}
                  review={userReview} key={userReview.id}/>;
              }) }
          </ul>
        </div>
      </div>;
    }
  }

});

module.exports = UserShowPage;


// { parseInt(self.props.params.userId) === parseInt(self.props.currentUser.id) ?
//   <span>
//     <button className="btn btn-default btn-sm" onClick={self.toggleEditReviewModal}>Edit Review</button>
//     <button className="btn btn-default btn-sm" onClick={self.deleteReview.bind(self, userReview.id)}>Delete Review</button>
//   </span> : "" }
//   <Modal show={self.state.editReviewModalIsOpen} onHide={self.closeEditReviewModal}>
//     <Modal.Header closeButton>
//       <Modal.Title>Edit Review</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <EditReviewForm review={userReview} currentUser={self.props.currentUser}
//         closeModalCallback={self.closeEditReviewModal}/>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button onClick={self.closeEditReviewModal}>Never Mind</Button>
//     </Modal.Footer>
//   </Modal>
//   <br/>
