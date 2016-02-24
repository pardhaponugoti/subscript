var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/app.jsx');
var UserShowPage = require('./components/userShowPage.jsx');
var NewUserForm = require('./components/newUserForm');
var NewSessionForm = require('./components/newSessionForm.jsx');

var routes = (
  <Route path="/" component={App}>ß
    <Route path="session/new" component={NewSessionForm}></Route>
    <Route path="users/new" component={NewUserForm}></Route>
    <Route path="users/:userId" component={UserShowPage}></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('root')
  );
});
