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

var ReviewShowComponent = require('./reviewShowComponent.jsx');
var NewReviewForm = require('./newReviewForm.jsx');
var EditReviewForm = require('./editReviewForm.jsx');


function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

var UserShowPage = React.createClass({
  getInitialState: function() {
    return {
      currentShowUser: UserStore.findById(this.props.params.userId),
      currentShowUserReviews: ReviewStore.findByUserId(this.props.params.userId),
      newReviewModalIsOpen: false,
      editReviewModalIsOpen: false
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

  toggleNewReviewModal: function() {
    this.setState({
      newReviewModalIsOpen: !this.state.newReviewModalIsOpen
    });
  },
  closeNewReviewModal: function() {
    this.setState({
      newReviewModalIsOpen: false
    });
  },
  toggleEditReviewModal: function() {
    this.setState({
      editReviewModalIsOpen: !this.state.editReviewModalIsOpen
    });
  },
  closeEditReviewModal: function() {
    this.setState({
      editReviewModalIsOpen: false
    });
  },

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
      return <div>
        <div className="col-md-4">
          <img src={this.state.currentShowUser.image} className="img-center"></img>
          <br/>
          <ul>Subscriptions
            {this.state.currentShowUserReviews.map(function(review) {
              return <li key={review.id}><Link to={"/subscriptions/" + review.subscription_id}>
                {SubscriptionStore.findById(review.subscription_id).name}</Link></li>;
            })}
          </ul>
          <div>LEFT 1/3</div>
        </div>
        <div className="col-md-8">
          <div className="lead">{this.state.currentShowUser.first_name + " " + this.state.currentShowUser.last_name}
            { parseInt(this.props.params.userId) === parseInt(this.props.currentUser.id) ?
              <span className="small"><Link to={"/users/" + this.props.params.userId + "/edit"}>                   Edit</Link></span> : "" }
          </div>
          <div>Location: {this.state.currentShowUser.location}</div>
          <div>Email: {this.state.currentShowUser.email}</div>
          <div>Date of Birth: {this.state.currentShowUser.date_of_birth}</div>
          <div>RIGHT 2/3</div>
          <br/>
            { parseInt(this.props.params.userId) === parseInt(this.props.currentUser.id) ?
              <button className="btn btn-default btn-sm" onClick={this.toggleNewReviewModal}>Create New Review</button> : "" }
            <Modal show={this.state.newReviewModalIsOpen} onHide={this.closeNewReviewModal}>
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
          <div>
            { this.state.currentShowUserReviews.map(function(userReview) {
              return <div>
                <ReviewShowComponent review={userReview} key={userReview.id}/>
                { parseInt(self.props.params.userId) === parseInt(self.props.currentUser.id) ?
                  <button className="btn btn-default btn-sm" onClick={self.toggleEditReviewModal}>Edit Review</button> : "" }
                  <Modal show={self.state.editReviewModalIsOpen} onHide={self.closeEditReviewModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditReviewForm review={userReview} currentUser={self.props.currentUser}
                        closeModalCallback={self.closeEditReviewModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={self.closeEditReviewModal}>Never Mind</Button>
                    </Modal.Footer>
                  </Modal>
                <br/>
              </div>;
            })}
          </div>
        </div>
      </div>;
    }
  }

});

module.exports = UserShowPage;
