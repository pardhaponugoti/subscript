var React = require('react');

var ReviewStore = require('../stores/review.js');

var ReviewShowComponent = require('./reviewShowComponent.jsx');

var ReviewFeed = React.createClass({
  getInitialState: function() {
    return {
      reviews: ReviewStore.all()
    };
  },
  render: function() {
    if (this.state.reviews === undefined) {
      return <div>FEED GOES HERE</div>;
    } else {
      return <div>STAY TUNED</div>;
    }
  }
});

module.exports = ReviewFeed;
