var React = require('react');
var History = require('react-router').History;

var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var UserBackendActions = require('../actions/userBackendActions');


var UserEditPage = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      currentUser: SessionStore.currentUser(),
      firstName: SessionStore.currentUser().first_name,
      lastName: SessionStore.currentUser().last_name,
      email: SessionStore.currentUser().email,
      location: SessionStore.currentUser().location,
      dateOfBirth: SessionStore.currentUser().date_of_birth,
      image: SessionStore.currentUser().image
    };
  },
  componentWillMount: function() {
    if (SessionStore.currentUser() !== undefined && SessionStore.currentUser().id !== parseInt(this.props.params.userId)) {
      this.history.push("/");
    }
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  onSessionChange: function() {
    if (SessionStore.currentUser().id !== parseInt(this.props.params.userId)) {
      this.history.push("/");
    }
    this.setState({
      currentUser: SessionStore.currentUser(),
      firstName: SessionStore.currentUser().first_name,
      lastName: SessionStore.currentUser().last_name,
      email: SessionStore.currentUser().email,
      location: SessionStore.currentUser().location,
      dateOfBirth: SessionStore.currentUser().date_of_birth,
      image: SessionStore.currentUser().image
    });
  },
  openCloudinaryWidget: function() {
    cloudinary.openUploadWidget({ cloud_name: 'pardha', upload_preset: 'pardha'},
      function(error, result) { console.log(result) });
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
  handleSubmit: function(e) {
    e.preventDefault();
    UserBackendActions.updateUser({
      id: this.state.currentUser.id,
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        location: this.state.location,
        date_of_birth: this.state.dateOfBirth,
        image: this.state.image
      }
    });
  },
  render: function() {
    if (SessionStore.currentUser() === undefined) {
      return <div id="WAITING-FOR-SESSION-STORE-LOAD"></div>;
    } else {
      return <div>
        <form id="user-edit-form" onSubmit={this.handleSubmit}>
          <label>First Name
            <input type="string" name="user[first_name]" value={this.state.firstName}
                onChange={this.firstNameChange}/>
          </label>
          <br/>
          <label>Last Name
            <input type="string" name="user[last_name]" value={this.state.lastName}
                onChange={this.lastNameChange}/>
          </label>
          <br/>
          <label>Email
            <input type="string" name="user[email]" value={this.state.email}
                onChange={this.emailChange} />
          </label>
          <br/>
          <label>Location
            <input type="string" name="user[location]" value={this.state.location}
                onChange={this.locationChange} />
          </label>
          <br/>
          <label>Date of Birth
            <input type="date" name="user[date_of_birth]" value={this.state.dateOfBirth}
                onChange={this.DOBChange} />
          </label>
          <br/>
          <label> Current Profile Picture:
            <br/>
            <img src={this.state.image} height="256" width="256"/>
            <br/>
            <br/>
            <a href="#" id="upload_widget_opener" onClick={this.openCloudinaryWidget}>Update Profile Picture</a>
          </label>
          <br/>
          <input type="submit" className="btn"/>
        </form>
      </div>;
    }
  }
});


module.exports = UserEditPage;
