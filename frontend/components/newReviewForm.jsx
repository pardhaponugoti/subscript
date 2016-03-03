var React = require('react');

var Alert = require('react-bootstrap').Alert;

var ReviewStore = require('../stores/review.js');
var BrowserHistory = require('react-router').browserHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SubscriptionSearch = require('./subscriptionSearch.jsx');
var ReviewBackendActions = require('../actions/reviewBackendActions.js');

var NewReviewForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      subscriptionId: null,
      rating: 5,
      comment: "",
      frequency: 5,
      alertVisible: false,
      errors: ""
    };
  },

  updateFormCallback: function(id) {
    this.setState({
      subscriptionId: id
    });
  },

  submitNewReview: function(e) {
    e.preventDefault();
    var successCallback = function() {
      this.props.closeModalCallback();
    }.bind(this);
    var errorCallback = function(error) {
      this.setState({
        alertVisible: true,
        errors: JSON.parse(error)
      });
    }.bind(this);
    ReviewBackendActions.createReview({
      review: {
        author_id: this.props.currentUser.id,
        subscription_id: this.state.subscriptionId,
        rating: this.state.rating,
        comment: this.state.comment,
        frequency: this.state.frequency
      }},
    successCallback,
    errorCallback);
  },

  updateFrequency: function(e) {
    this.setState({
      frequency: e.target.value
    });
  },
  updateRating: function(e) {
    this.setState({
      rating: e.target.value
    });
  },

  submitButtonDisabled: function() {
    if (this.state.subscriptionId === null) {
      return true;
    } else {
      return false;
    }
  },

  showAlert: function() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" className="alert-messages" onDismiss={this.handleAlertDismiss} dismissAfter={4000}>
          {this.state.errors.map(function(error) {
            return <h4>{error}</h4>;
          })}
        </Alert>
      );
    } else {
      return null;
    }
  },
  handleAlertDismiss: function() {
    this.setState({
      alertVisible: false
    });
  },

  render: function() {
    return <form className="container-fluid">
      <div>
        {this.showAlert()}
        <div className="col-md-4">
          <SubscriptionSearch updateFormCallback={this.updateFormCallback} />
        </div>
        <div className="col-md-8">
          How often do you use this service?
          <br/>
          <label className="radio-inline"><input type="radio" value="5"
            checked={ this.state.frequency == 5 }
            name="review[frequency]" onClick={this.updateFrequency}/>Daily</label>

          <label className="radio-inline"><input type="radio" value="4"
            checked={ this.state.frequency == 4 }
            name="review[frequency]" onClick={this.updateFrequency}/>Weekly</label>

          <label className="radio-inline"><input type="radio" value="3"
            checked={ this.state.frequency == 3 }
            name="review[frequency]" onClick={this.updateFrequency}/>Monthly</label>

          <label className="radio-inline"><input type="radio" value="2"
            checked={ this.state.frequency == 2 }
            name="review[frequency]" onClick={this.updateFrequency}/>Yearly</label>

          <label className="radio-inline"><input type="radio" value="1"
            checked={ this.state.frequency == 1 }
            name="review[frequency]" onClick={this.updateFrequency}/>Never</label>
          <br/>
          <br/>
          Rate the service:
          <br/>
          <label className="radio-inline"><input type="radio" value="1"
            checked={ this.state.rating == 1 }
            name="review[rating]" onClick={this.updateRating} />1</label>
          <label className="radio-inline"><input type="radio" value="2"
            checked={ this.state.rating == 2 }
            name="review[rating]" onClick={this.updateRating} />2</label>
          <label className="radio-inline"><input type="radio" value="3"
            checked={ this.state.rating == 3 }
            name="review[rating]" onClick={this.updateRating} />3</label>
          <label className="radio-inline"><input type="radio" value="4"
            checked={ this.state.rating == 4 }
            name="review[rating]" onClick={this.updateRating} />4</label>
          <label className="radio-inline"><input type="radio" value="5"
            checked={ this.state.rating == 5 }
            name="review[rating]" onClick={this.updateRating} />5</label>
          <br/>
          <br/>
          Comments:
          <br/>
          <textarea cols="40" rows="5" valueLink={this.linkState("comment")}/>
        </div>
        <div className="row submit-button-row">
          <input className="btn create-review-btn" type="submit" onClick={this.submitNewReview}/>
        </div>
      </div>
    </form>;
  }
});

// disabled={this.submitButtonDisabled()}

module.exports = NewReviewForm;
