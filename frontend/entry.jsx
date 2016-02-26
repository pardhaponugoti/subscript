var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BrowserHistory = require('react-router').browserHistory;

var App = require('./components/app.jsx');
var NewUserForm = require('./components/newUserForm');
var NewSessionForm = require('./components/newSessionForm.jsx');
var UserShowPage = require('./components/userShowPage.jsx');
var UserEditPage = require('./components/userEditPage.jsx');
var SubscriptionShowPage = require('./components/subscriptionShowPage.jsx');
var ReviewFeed = require('./components/reviewFeed.jsx');

//test components
var SubscriptionSearch = require('./components/subscriptionSearch.jsx');
var NewReviewForm = require('./components/newReviewForm.jsx');

window.NewReviewForm = NewReviewForm;

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ReviewFeed} />
    <Route path="feed" component={ReviewFeed}></Route>
    <Route path="users/:userId" component={UserShowPage}></Route>
    <Route path="users/:userId/edit" component={UserEditPage}></Route>
    <Route path="subscriptions/:subscriptionId" component={SubscriptionShowPage}></Route>
    <Route path="*" component={ReviewFeed} ></Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={BrowserHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});
