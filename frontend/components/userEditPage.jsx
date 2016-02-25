var React = require('react');
var History = require('react-router').History;

var SessionStore = require('../stores/session.js');
var UserStore = require('../stores/user.js');
var UserBackendActions = require('../actions/userBackendActions');


var _oldImage = "";

var UserEditPage = React.createClass({
  mixins: [History],
  getInitialState: function() {
    var inputImage = "";
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
    console.log("editpagewillmount");
    console.log(SessionStore.currentUser());
    console.log(this.props.params.userId);
    if (SessionStore.currentUser() !== undefined && SessionStore.currentUser().id !== parseInt(this.props.params.userId)) {
      this.history.push("/");
    }
  },
  componentDidMount: function() {
    this.listenerToken = SessionStore.addListener(this.onSessionChange);
  },
  onSessionChange: function() {
    this.history.push("/");
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
    this.history.push("users/"+this.state.currentUser.id);
  },
  deleteUser: function(e) {
    e.preventDefault();
    UserBackendActions.deleteUser(this.state.currentUser.id);
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
            <img src={this.state.image}/>
            <br/>
            <br/>
            <button onClick={this.openCloudinaryWidget}>Update Profile Picture</button>
            <div id="my-widget-container"></div>
          </label>
          <br/>
          <input type="submit" className="btn"/>
          <button className="btn" onClick={this.cancelUpdate}>Cancel</button>
          <br/>
          <br/>
          <button className="btn" onClick={this.deleteUser}>Delete My Account</button>
        </form>
      </div>;
    }
  }
});


module.exports = UserEditPage;
