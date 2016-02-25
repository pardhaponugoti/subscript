var React = require('react');

var SubscriptionStore = require('../stores/subscription.js');

var SubscriptionSearch = React.createClass({
    getInitialState: function(){
        return {
          searchString: '',
          subscriptions: SubscriptionStore.all()
         };
    },
    componentDidMount: function() {
      this.listenerToken = SubscriptionStore.addListener(this.subscriptionChange);
    },
    componentWillUnmount: function() {
      this.listenerToken.remove();
    },

    subscriptionChange: function() {
      this.setState({
        subscriptions: SubscriptionStore.all()
      });
    },

    handleChange: function(e){
      e.preventDefault();
      this.setState({searchString: e.target.value});
    },

    updateForm: function(id, name){
      this.props.updateFormCallback(id);
      this.setState({searchString: name});
    },

    render: function() {
      var subs = this.state.subscriptions;
      var self = this;

      if(this.state.searchString.length > 0){
        subs = subs.filter(function(sub){
            return sub.name.toLowerCase().match( self.state.searchString.toLowerCase() );
        });
      }

      var subUl;
      subUl = <ul>
          { subs.map(function(sub){
              return <li key={sub.id} onClick={self.updateForm.bind(self, sub.id, sub.name)}>{sub.name}</li>;
          }) }
      </ul>;
      
      return <div>
        <input type="text" value={this.state.searchString} onChange={this.handleChange}
          name={this.props.searchName} placeholder="Subscription" />
        {subUl}
      </div>;
    }
});

module.exports = SubscriptionSearch;
