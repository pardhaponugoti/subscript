var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var UserStore = require('../stores/user.js');
var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');

var ReviewBackendActions = require('../actions/reviewBackendActions.js');

var EditReviewForm = require('./editReviewForm.jsx');

var FREQUENCY = {
  1: "Never",
  2: "Yearly",
  3: "Monthly",
  4: "Weekly",
  5: "Daily"
};

// TAKES IN A REVIEW IN PROPS

var ReviewShowComponent = React.createClass({
  getInitialState: function() {
    return {
      author: UserStore.findById(this.props.review.author_id),
      subscription: SubscriptionStore.findById(this.props.review.subscription_id),
      currentTime: new Date(),
      editReviewModalIsOpen: false
    };
  },

  openSubscriptionPage: function() {
    BrowserHistory.push("/subscriptions/" + this.state.subscription.id);
  },
  openAuthorPage: function() {
    BrowserHistory.push("/users/" + this.state.author.id);
  },

  toggleEditReviewModal: function() {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
    this.setState({
      editReviewModalIsOpen: !this.state.editReviewModalIsOpen
    });
  },
  closeEditReviewModal: function() {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
    this.setState({
      editReviewModalIsOpen: false
    });
  },
  deleteReview: function(reviewId) {
    ReviewBackendActions.deleteReview(reviewId);
  },


  render: function() {
    // two cases -- if the currentUser has been passed down or if not
    if (this.props.currentUser) {
      return <li className="review-show container-fluid" key={this.props.review.id}>
        <div className="row-fluid">
          <div className="col-md-3">
            <img src={this.state.author.image} onClick={this.openAuthorPage}
              className="profile-link-img" height="125" width="125"></img>
            <div><h4>{ this.state.author.first_name + " " + this.state.author.last_name }</h4></div>
            <div>Uses Service: {FREQUENCY[this.props.review.frequency]}</div>
            { parseInt(this.props.userId) === parseInt(this.props.currentUser.id) ?
              <div className="row-fluid">
                <div>
                  <button className="btn btn-default btn-sm edit-review-btn" onClick={this.toggleEditReviewModal}>Edit Review</button>
                  </div>
                  <div>
                  <button className="btn btn-sm delete-review-btn" onClick={this.deleteReview.bind(this, this.props.review.id)}>Delete Review</button>
                </div>
                <Modal show={this.state.editReviewModalIsOpen} onHide={this.closeEditReviewModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditReviewForm review={this.props.review} currentUser={this.props.currentUser}
                      closeModalCallback={this.closeEditReviewModal}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.closeEditReviewModal}>Never Mind</Button>
                  </Modal.Footer>
                </Modal>
              </div> : null }
          </div>
          <div className="col-md-9">
            <div><h4><a className="subscription-name-link" onClick={this.openSubscriptionPage}>{this.state.subscription.name}</a></h4></div>
            <div className="gold-stars">{"★".repeat(this.props.review.rating)}</div>
            <div className="review-comment">{"\"" + this.props.review.comment + "\""}</div>
          </div>
        </div>
      </li>;
    } else {
      return <li className="review-show container-fluid" key={this.props.review.id}>
        <div className="col-md-3">
          <img src={this.state.author.image} onClick={this.openAuthorPage}
            className="profile-link-img" height="125" width="125"></img>
          <div><h4><a className="subscription-name-link" onClick={this.openAuthorPage}>
            { this.state.author.first_name + " " + this.state.author.last_name }
          </a></h4></div>
          <div>Uses Service: {FREQUENCY[this.props.review.frequency]}</div>
        </div>
        <div className="col-md-9">
          <div><h4><a className="subscription-name-link" onClick={this.openSubscriptionPage}>
            {this.state.subscription.name}
          </a></h4></div>
          <div className="gold-stars">{"★".repeat(this.props.review.rating)}</div>
          <div className="review-comment">
              { this.props.review.comment ? "\"" + this.props.review.comment + "\"" : "" }
          </div>
        </div>
      </li>;
    }
  }
});

module.exports = ReviewShowComponent;
