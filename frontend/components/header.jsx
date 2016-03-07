var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;
var Modal = require('react-bootstrap').Modal;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Button = require('react-bootstrap').Button;
var Link = require('react-router').Link;

var HeaderSearchComponent = require('../components/headerSearchComponent.jsx');
var SessionBackendActions = require('../actions/sessionBackendActions.js');
var NewSessionForm = require('../components/newSessionForm.jsx');
var NewUserForm = require('../components/newUserForm.jsx');

var Header = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      signInOpen: true
    };
  },

  componentDidMount: function() {

    if (this.props.addSteps) {

      setTimeout(function() {
        this.props.addSteps([
          { title: 'This is the Review Feed',
                    text: "Check out user reviews from around the galaxy!",
                    selector: '.review-show',
                    position: 'top',
                    type: 'hover',
                    style: {
                      backgroundColor: '#fff',
                      mainColor: '#9BBEA8',
                      color: '#000',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      width: '40rem'
                    }
                } ,
          { title: 'Profile',
                    text: "Click here to see your profile, write new reviews, or edit your old reviews.",
                    selector: '.open-profile',
                    position: 'right',
                    type: 'hover',
                    style: {
                      backgroundColor: '#fff',
                      mainColor: '#9BBEA8',
                      color: '#000',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      width: '40rem'
                    }
                } ,
          { title: 'Write a new review',
                    text: "Click here to write a new review!",
                    selector: '.write-new-review',
                    position: 'right',
                    type: 'hover',
                    style: {
                      backgroundColor: '#fff',
                      mainColor: '#9BBEA8',
                      color: '#000',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      width: '40rem'
                    }
                } ,
          {
            title: 'Search Bar',
            text: "Search for companies or users",
            selector: '.header-search-box',
            position: 'bottom',
            type: 'hover',
            style: {
              backgroundColor: '#fff',
              mainColor: '#9BBEA8',
              color: '#000',
              borderRadius: '1rem',
              textAlign: 'center',
              width: '40rem'
            }
          },
          {
            title: 'Statistics',
            text: "Click here to see summary statistics for all the services on the site",
            selector: '.statistics-link',
            position: 'bottom',
            type: 'hover',
            style: {
              backgroundColor: '#fff',
              mainColor: '#9BBEA8',
              color: '#000',
              borderRadius: '1rem',
              textAlign: 'center',
              width: '40rem'
            }
          },
          {
            title: 'Services',
            text: "Click here to browse all the services reviewed on the site.",
            selector: '.services-link',
            position: 'bottom',
            type: 'hover',
            style: {
              backgroundColor: '#fff',
              mainColor: '#9BBEA8',
              color: '#000',
              borderRadius: '1rem',
              textAlign: 'center',
              width: '40rem'
            }
          },
          {
            title: 'subscript',
            text: "Click here to go back to the review feed from anywhere in the site.  Enjoy!",
            selector: '.title-centered',
            position: 'bottom',
            type: 'hover',
            style: {
              backgroundColor: '#fff',
              mainColor: '#9BBEA8',
              color: '#000',
              borderRadius: '1rem',
              textAlign: 'center',
              width: '40rem'
            }
          }

       ]);
     }.bind(this), 250);
   }
  },

  currentUserUrl: function() {
    return "users/" + this.props.currentUser.id;
  },
  editUserUrl: function() {
    return this.currentUserUrl() + "/edit";
  },

  toggleModal: function() {
    $("#App").css({
      "-webkit-filter": "blur(5px)",
      "filter": "blur(5px)",
      "-o-filter": "blur(5px)",
      "-moz-filter": "blur(5px)"
    });
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  },
  openSignInForm: function() {
    this.setState({
      signInOpen: true
    });
  },
  openSignUpForm: function() {
    this.setState({
      signInOpen: false
    });
  },
  openSignUpFormAndModal: function() {
    this.setState({
      signInOpen: false,
      modalIsOpen: true
    });
  },
  close: function() {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
    this.setState({
      modalIsOpen: false
    });
  },

  renderRoot: function() {
    BrowserHistory.push("/");
  },
  openSubscriptionsIndex: function() {
    BrowserHistory.push("/subscriptions");
  },
  openStatisticsPage: function() {
    BrowserHistory.push("/statistics");
  },
  showCurrentUserPage: function() {
    BrowserHistory.push("/"+this.currentUserUrl());
  },
  showEditUserPage: function() {
    BrowserHistory.push("/"+this.editUserUrl());
  },
  signOut: function() {
    SessionBackendActions.signOutUser(
      function() {
        BrowserHistory.push("/");
      }
    );
  },

  userDropdown: function() {
    if (this.props.loggedIn) {
      return <div className="btn-group nav navbar-nav navbar-right header-dropdown">
        <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
          <img src={this.props.currentUser.image} height="20" width="20"/>
          {" " + this.props.currentUser.first_name + " " + this.props.currentUser.last_name} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={this.showCurrentUserPage}>My Page</a></li>
          <li><a onClick={this.showEditUserPage}>Edit Profile</a></li>
          <li><a onClick={this.signOut}> Sign Out</a></li>
        </ul>
      </div>;
    } else {
      var inputs = {};
      if (this.state.signInOpen) {
        inputs.header = "Sign In";
        inputs.form = <NewSessionForm closeModalCallback={this.close}/>;
        inputs.string = "New user?  ";
        inputs.button = <Button onClick={this.openSignUpForm}>Sign Up</Button>;
      } else {
        inputs.header = "Sign Up";
        inputs.form = <NewUserForm closeModalCallback={this.close}/>;
        inputs.string = "Already a user?";
        inputs.button = <Button onClick={this.openSignInForm}>Sign In</Button>;
      }
      return <div className="nav navbar-nav navbar-right btn-group header-dropdown">
        <button className="btn btn-default btn-sm dropdown-toggle" onClick={this.toggleModal}>{inputs.header}</button>
        <Modal show={this.state.modalIsOpen} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{inputs.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {inputs.form}
          </Modal.Body>
          <Modal.Footer>
            {inputs.string + " "}
            {inputs.button}
          </Modal.Footer>
        </Modal>
      </div>;
    }
  },
  render: function() {
    return <nav className="navbar navbar-fixed-top" id="navbar-primary">
      <div className="navbar-header header-home">
        <a onClick={this.renderRoot} className="navbar-brand white-text">Σ</a>
      </div>
      <HeaderSearchComponent />
      <div onClick={this.renderRoot} className="title-centered">subscript</div>
      <div id="navbarCollapse" className="collapse navbar-collapse">
        {this.userDropdown()}
        <div className="navbar-right">
          <a onClick={this.openStatisticsPage} className="navbar-text white-text statistics-link">Statistics</a>
          <a onClick={this.openSubscriptionsIndex} className="navbar-text white-text services-link">Services</a>
        </div>
      </div>
    </nav>;
  }
});

module.exports = Header;
