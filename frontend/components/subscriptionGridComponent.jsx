var React = require('react');
var Link = require('react-router').Link;

var SubscriptionGridComponent = React.createClass({
  render: function() {
      return  <div className="col-md-4 col-sm-6 col-xs-6 subscription-grid-component">
          <Link className="subscription-name-link" to={"/subscriptions/" + this.props.subscription.id}>
            <div><img className="subscription-logo-thumbnail" src={this.props.subscription.logo} height="256"/></div>
            <div className="col-md-offset-1 col-md-10">
              <h4><a>{this.props.subscription.name}</a></h4>
              <h6>{this.props.subscription.description}</h6>
            </div>
          </Link>
      </div>;
  }
});

// <div className="row">
//   <h6>{this.props.subscription.description}</h6>
// </div>

module.exports = SubscriptionGridComponent;
