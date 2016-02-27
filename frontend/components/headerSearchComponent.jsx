var React = require('react');
var BrowserHistory = require('react-router').browserHistory;

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var UserStore = require('../stores/user.js');
var SubscriptionStore = require('../stores/subscription.js');

var HeaderSearchComponent = React.createClass({
    getInitialState: function(){
      return {
        selected: false,
        searchString: '',
        subscriptions: SubscriptionStore.all(),
        users: UserStore.all()
       };
    },
    componentDidMount: function() {
      this.subscriptionListenerToken = SubscriptionStore.addListener(this.subscriptionChange);
      this.userListenerToken = UserStore.addListener(this.userChange);
    },
    componentWillUnmount: function() {
      this.subscriptionListenerToken.remove();
      this.userListenerToken.remove();
    },

    subscriptionChange: function() {
      this.setState({
        subscriptions: SubscriptionStore.all()
      });
    },
    userChange: function() {
      this.setState({
        users: UserStore.all()
      });
    },

    handleChange: function(e) {
      e.preventDefault();
      this.setState({
        searchString: e.target.value,
        selected: false
      });
    },

    updateForm: function(element){
      if (element.email === undefined) {
        BrowserHistory.push("/subscriptions/" + element.id);
      } else {
        BrowserHistory.push("/users/" + element.id);
      }
      this.setState({
        searchString: element.name,
        selected: true
      });
    },

    render: function() {
      var elements = this.state.subscriptions.concat(this.state.users);
      var self = this;

      if(this.state.searchString.length > 0){
        elements = elements.filter(function(element){
          if (element.email === undefined) {
            return element.name.toLowerCase().match( self.state.searchString.toLowerCase() );
          } else {
            var name = element.first_name + " " + element.last_name;
            return name.toLowerCase().match( self.state.searchString.toLowerCase() );
          }
        });
      }

      var elementUl;

      if(this.state.selected || this.state.searchString.length === 0) {
        elementUl = null;
      } else {
        elementUl = <ul>
          { elements.map(function(element){
            if (element.email === undefined) {
              return <li onClick={self.updateForm.bind(self, element)}>{element.name}</li>;
              } else {
                return <li onClick={self.updateForm.bind(self, element)}>{element.first_name + " " + element.last_name}</li>;
              }
            })
          }
        </ul>;
      }

      return <form role="search" className="navbar-form navbar-left">
        <div className = "form-group">
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search" className="form-control"/>
        {elementUl}
        </div>
      </form>;
    }
});

module.exports = HeaderSearchComponent;
