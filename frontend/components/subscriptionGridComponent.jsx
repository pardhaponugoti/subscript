var React = require('react');
var Link = require('react-router').Link;

var SubscriptionGridComponent = React.createClass({
  render: function() {
      return  <div className="col-md-4 col-sm-6 col-xs-6 subscription-grid-component">
          <Link to={"/subscriptions/" + this.props.subscription.id}>
            <div><img className="subscription-logo" src={this.props.subscription.logo} /></div>
            <div className="col-md-offset-1 col-md-10">
              <h4><text className="subscription-name-link">{this.props.subscription.name}</text></h4>
              <h6 className="black-text">{this.props.subscription.description}</h6>
            </div>
          </Link>
      </div>;
  }
});

module.exports = SubscriptionGridComponent;
