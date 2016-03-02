var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var UserStore = require('../stores/user.js');

var NewSessionForm = require('./newSessionForm.jsx');
var NewUserForm = require('./newUserForm.jsx');

var SessionBackendActions = require('../actions/sessionBackendActions.js');

var SplashPage = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      signInOpen: true,
      demo: false
    };
  },

  blurBackground: function() {
    $("#App").css({
      "-webkit-filter": "blur(5px)",
      "filter": "blur(5px)",
      "-o-filter": "blur(5px)",
      "-moz-filter": "blur(5px)"
    });
  },
  unblurBackground: function() {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
  },

  openSignUp: function() {
    this.blurBackground();
    this.setState({
      modalIsOpen: true,
      signInOpen: false,
      demo: false
    });
  },
  openSignIn: function() {
    this.blurBackground();
    this.setState({
      modalIsOpen: true,
      signInOpen: true,
      demo: false
    });
  },
  demoUser: function() {
    this.blurBackground();
    this.setState({
      modalIsOpen: true,
      demo: true
    });
  },
  close: function() {
    this.unblurBackground();
    this.setState({
      modalIsOpen: false,
    });
  },

  signInUser: function(email) {
    $("#App").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)",
      "-o-filter": "blur(0px)",
      "-moz-filter": "blur(0px)"
    });
    SessionBackendActions.signInUser({user:
      {email: email,
       password: "password1"}
     });
    // console.log(email);
    // this.setState({
    //   modalIsOpen: true,
    //   demo: false,
    //   signInOpen: true
    // },
    //   function() {
    //     setTimeout( function() {
    //     console.log("should be setting email and password");
    //     console.log($( "new-session-email" ).length);
    //     console.log($( "new-session-password" ).length);
    //
    //     $("new-session-email").val(email);
    //     $("new-session-password").val("password1");
    //   }, 2000);
    //   }
    // );
  },

  demoOptions: function() {
    var user1 = UserStore.findById(1);
    var user2 = UserStore.findById(2);
    var user3 = UserStore.findById(3);
    return <div className="demo-modal">
      <h4>Continue As</h4>
      <div className="row">
        <button onClick={this.signInUser.bind(this, user1.email)} className="btn btn-default btn-sm demo-btn demo-btn-1">
          <img src={user1.image} height="25"/>
          {" " + user1.first_name + " " + user1.last_name}
        </button>
        <button onClick={this.signInUser.bind(this, user2.email)} className="btn btn-default btn-sm demo-btn demo-btn-2">
          <img src={user2.image} height="25"/>
          {" " + user2.first_name + " " + user2.last_name}
        </button>
        <button onClick={this.signInUser.bind(this, user3.email)} className="btn btn-default btn-sm demo-btn demo-btn-3">
          <img src={user3.image} height="25"/>
          {" " + user3.first_name + " " + user3.last_name}
        </button>
      </div>
    </div>;
  },

  render: function() {
    var inputs = {};
    if (this.state.demo) {
      inputs.header="Demo";
      inputs.form = this.demoOptions();
      inputs.string = "";
      inputs.button = <div>Enjoy!</div>;
    } else if (this.state.signInOpen) {
      inputs.header = "Sign In";
      inputs.form = <NewSessionForm closeModalCallback={this.close}/>;
      inputs.string = "";
      inputs.button = <div>Welcome Back!</div>;
    } else {
      inputs.header = "Sign Up";
      inputs.form = <NewUserForm closeModalCallback={this.close}/>;
      inputs.string = "";
      inputs.button = <div>Welcome to subscript!</div>;
    }

    return <div className="splash-page-div">
      <div className="splash-page-inner-text">
        <h1 className="">Σ</h1>
        <h2>subscript</h2>
        <br/>
        <h5>rate your paid subscriptions and services</h5>
      </div>
      <br/>
      <br/>
      <div className="row">
        <button onClick={this.openSignUp} className="btn btn-sm splash-btn">Sign Up</button>
        <button onClick={this.openSignIn} className="btn btn-sm splash-btn">Sign In</button>
        <button onClick={this.demoUser} className="btn btn-sm splash-btn">Demo User</button>
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
      </div>
    </div>;
  }
});

module.exports = SplashPage;
