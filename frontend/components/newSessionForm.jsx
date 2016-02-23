var React = require('react');


var NewSessionForm = React.createClass({
  getInitialState: function() {
    return {
      email : "" ,
      password : "" ,
    };
  },
  emailChange: function(e) {
    this.setState({
      email: e.target.value
    });
  },
  passwordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },
  render: function() {
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    return <form action="/session" method="post" className="new-session-form">
      <input name="authenticity_token" type="hidden" value={csrfToken} />
      <label>Email
        <input type="text" name="user[email]" value={this.state.email}
            onChange={this.emailChange} />
      </label>
      <br/>
      <label>Password
        <input type="password" name="user[password]" value={this.state.password}
            onChange={this.passwordChange} />
      </label>
      <br/>
      <input type="submit"/>
    </form>;
  }
});

module.exports = NewSessionForm;
