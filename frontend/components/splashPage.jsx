var React = require('react');

var Header = require('./header.jsx');

var SplashPage = React.createClass({
  render: function() {
    return <div className="splash-page-div">
      <div className="blank-space"></div>
      <h1 className="">Σ</h1>
      <h2>subscript</h2>
      <br/>
      <h5>rate your paid subscriptions and services</h5>
      <div className="blank-space-2"></div>
    </div>;
  }
});

module.exports = SplashPage;
