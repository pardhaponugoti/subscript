var React = require('react');
var Joyride = require('react-joyride');

var Tour = React.createClass({
  getInitialState: function() {
    return {
      steps: null
    };
  },

  addSteps: function (steps) {
    var joyride = this.refs.joyride;

    if (!Array.isArray(steps)) {
        steps = [steps];
    }

    if (!steps.length) {
        return false;
    }

    this.setState(function(currentState) {
        currentState.steps = currentState.steps.concat(joyride.parseSteps(steps));
        return currentState;
    });
  },
  addTooltip: function (data) {
    this.refs.joyride.addTooltip(data);
  },

  render: function() {
    return <div className="tour">
      <Joyride ref="joyride" steps={this.state.steps} debug={true}/>
    </div>;
  }

});

module.exports = Tour;
