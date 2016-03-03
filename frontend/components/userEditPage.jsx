var React = require('react');
var BrowserHistory = require('react-router').browserHistory;
var Alert = require('react-bootstrap').Alert;

var UserStore = require('../stores/user.js');
var UserBackendActions = require('../actions/userBackendActions');

var UserEditPage = React.createClass({
  getInitialState: function() {
    return {
      firstName: this.props.currentUser.first_name,
      lastName: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      location: this.props.currentUser.location,
      dateOfBirth: this.props.currentUser.date_of_birth,
      image: this.props.currentUser.image
    };
  },
  openCloudinaryWidget: function(e) {
    e.preventDefault();
    var self = this;
    cloudinary.openUploadWidget({
      cloud_name: 'pardha',
      upload_preset: 'pardha',
      multiple: false,
      cropping: "server",
      cropping_aspect_ratio: 1,
      cropping_default_selection_ratio: 0.9,
      cropping_show_dimensions: true,
      theme: "minimal"
    },
      function(error, result) {
        self.setState({image: result[0].url});
    });
  },

  firstNameChange: function(e) {
    this.setState({
      firstName: e.target.value
    });
  },
  lastNameChange: function(e) {
    this.setState({
      lastName: e.target.value
    });
  },
  emailChange: function(e) {
    this.setState({
      email: e.target.value
    });
  },
  locationChange: function(e) {
    this.setState({
      location: e.target.value
    });
  },
  DOBChange: function(e) {
    this.setState({
      dateOfBirth: e.target.value
    });
  },

  cancelUpdate: function(e) {
    e.preventDefault();
    BrowserHistory.push("/users/"+this.props.currentUser.id);
  },
  deleteUser: function(e) {
    e.preventDefault();
    UserBackendActions.deleteUser(
      this.props.currentUser.id,
      function() { BrowserHistory.push("/"); }
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.props.currentUser.id;
    var successCallback = function() { BrowserHistory.push("/users/" + id); };
    var errorCallback = function(error) {
      this.setState({
        alertVisible: true,
        errors: JSON.parse(error)
      });
    }.bind(this);
    UserBackendActions.updateUser({
      id: id,
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        location: this.state.location,
        date_of_birth: this.state.dateOfBirth,
        image: this.state.image
      },
    },
    successCallback,
    errorCallback
  );
  },

  showAlert: function() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle="danger" className="alert-messages" onDismiss={this.handleAlertDismiss} dismissAfter={4000}>
          {this.state.errors.map(function(error) {
            return <h4>{error}</h4>;
          })}
        </Alert>
      );
    } else {
      return null;
    }
  },
  handleAlertDismiss: function() {
    this.setState({
      alertVisible: false
    });
  },

  render: function() {
      return <div className="user-edit-page">
        <form id="user-edit-form" onSubmit={this.handleSubmit}>
          { this.showAlert() }
          <div className="col-md-4 col-md-offset-2">
            <label>First Name
              <br/>
              <input type="string" name="user[first_name]" value={this.state.firstName}
                  onChange={this.firstNameChange}/>
            </label>
            <br/>
            <label>Last Name
              <br/>
              <input type="string" name="user[last_name]" value={this.state.lastName}
                  onChange={this.lastNameChange}/>
            </label>
            <br/>
            <label>Email
              <br/>
              <input type="string" name="user[email]" value={this.state.email}
                  onChange={this.emailChange} />
            </label>
            <br/>
            <label>Location
              <br/>
              <input type="string" name="user[location]" value={this.state.location}
                  onChange={this.locationChange} />
            </label>
            <br/>
            <label>Date of Birth
              <br/>
              <input type="date" name="user[date_of_birth]" value={this.state.dateOfBirth}
                  onChange={this.DOBChange} />
            </label>
          </div>
          <div classname="col-md-4">
            <label> Profile Picture Preview:
              <br/>
              <img src={this.state.image}/>
              <br/>
              <br/>
              <button className="btn btn-default btn-sm" onClick={this.openCloudinaryWidget}>Change Profile Picture</button>
              <div id="my-widget-container"></div>
            </label>
          </div>
          <br/>
          <br/>
          <div className="row-fluid edit-profile-buttons">
            <div><input value="Update My Profile" type="submit" className="btn create-review-btn"></input></div>
            <br/>
            <div><button className="btn btn-default" onClick={this.cancelUpdate}>Cancel</button></div>
            <br/>
            <br/>
            <button className="btn delete-review-btn" onClick={this.deleteUser}>Delete My Account</button>
          </div>
        </form>
      </div>;
  }
});


module.exports = UserEditPage;
