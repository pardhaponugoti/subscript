var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app.jsx');
// var CurrentUserPage = require('./components/currentUserPage.jsx');
var NewUserForm = require('./components/newUserForm');
var NewSessionForm = require('./components/newSessionForm.jsx');

// <IndexRoute component={CurrentUserPage}/>
var routes = (
  <Route path="/" component={App}>
    <Route path="session/new" component={NewSessionForm}></Route>
    <Route path="users/new" component={NewUserForm}></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});

// New User Form

// document.addEventListener("DOMContentLoaded", function() {
//   ReactDOM.render(<NewUserForm/>, document.getElementById('new_user_form'));
// });

// New Session Form

// document.addEventListener("DOMContentLoaded", function() {
//   ReactDOM.render(<NewSessionForm/>, document.getElementById('new_session_form'));
// });


// App
