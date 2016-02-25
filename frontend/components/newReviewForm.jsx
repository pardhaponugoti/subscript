var React = require('react');

var ReviewStore = require('../stores/review.js');
var BrowserHistory = require('react-router').browserHistory;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SubscriptionSearch = require('./subscriptionSearch.jsx');

var NewReviewForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      subscriptionId: null,
      rating: 0,
      comment: ""
    };
  },

  updateFormCallback: function(id) {
    this.setState({
      subscriptionId: id
    });
  },

  submitNewReview: function(e) {
    e.preventDefault();
    console.log(this.state.subscriptionId);
    console.log(this.state.rating);
    console.log(this.state.comment);
  },

  render: function() {
    return <form>
      <div className="col-md-4">
        <SubscriptionSearch updateFormCallback={this.updateFormCallback} />
      </div>
      <div className="col-md-8">
        Rating: Input a number from 0 to 5, decimals ok!
        <br/>
        <input className="form-group" type="string" valueLink={this.linkState("rating")}></input>
        <br/>
        Comments:
        <br/>
        <input type="text" valueLink={this.linkState("comment")}/>
        <br/>
        <input type="submit" onClick={this.submitNewReview}/>
      </div>
    </form>;
  }
});

module.exports = NewReviewForm;
