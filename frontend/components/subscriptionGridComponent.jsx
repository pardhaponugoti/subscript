var React = require('react');
var Link = require('react-router').Link;

var SubscriptionGridComponent = React.createClass({
  render: function() {
      return  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6 subscription-grid-component">
          <Link className="subscription-name-link" to={"/subscriptions/" + this.props.subscription.id}>
            <div><img className="subscription-logo-thumbnail" src={this.props.subscription.logo} height="256"/></div>
            <div className="row">
              {this.props.subscription.name}
            </div>
          </Link>
      </div>;
  }
});


module.exports = SubscriptionGridComponent;
