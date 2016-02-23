var React = require('react');
var ReactDOM = require('react-dom');

var NewUserForm = require('./components/newUserForm');
var NewSessionForm = require('./components/newSessionForm.jsx');


// New User Form

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<NewUserForm/>, document.getElementById('new_user_form'));
});

// New Session Form

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<NewSessionForm/>, document.getElementById('new_session_form'));
});


// App
