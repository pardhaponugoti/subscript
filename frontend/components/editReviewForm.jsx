var React = require('react');

var Input = require('react-bootstrap').Input;

var ReviewStore = require('../stores/review.js');
var SubscriptionStore = require('../stores/subscription.js');
var BrowserHistory = require('react-router').browserHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SubscriptionSearch = require('./subscriptionSearch.jsx');
var ReviewBackendActions = require('../actions/reviewBackendActions.js');

// THIS FORM MUST BE PASSED THE CURRENT USER, A REVIEW, AND A CLOSE MODAL CALLBACK

var EditReviewForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      subscriptionId: this.props.review.subscription_id,
      subscription: SubscriptionStore.findById(this.props.review.subscription_id),
      rating: this.props.review.rating,
      comment: this.props.review.comment,
      frequency: this.props.review.frequency
    };
  },

  submitEditedReview: function(e) {
    e.preventDefault();
    this.props.closeModalCallback();
    ReviewBackendActions.editReview({
      id: this.props.review.id,
      review: {
        author_id: this.props.currentUser.id,
        subscription_id: this.state.subscriptionId,
        rating: this.state.rating,
        comment: this.state.comment,
        frequency: this.state.frequency
      }
    });
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

  render: function() {
    return <form className="container-fluid">
      <div>
        Subscription: {this.state.subscription.name}
        <br/>
        <br/>
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
        <br/>
        <input className="btn btn-default" type="submit" onClick={this.submitEditedReview}/>
      </div>
    </form>;
  }
});

module.exports = EditReviewForm;
