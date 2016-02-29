var React = require('react');
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;
var DonutChart = require("react-chartjs").Doughnut;

var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

function add(a, b) {
    return a + b;
}

var Chart = React.createClass({
  getInitialState: function() {
    return {
      subscription: SubscriptionStore.findById(1),
      reviews: ReviewStore.findBySubscriptionId(1)
    };
  },
  componentDidMount: function() {
    this.subscriptionListenerToken = SubscriptionStore.addListener(this.onChange);
    this.reviewListenerToken = ReviewStore.addListener(this.onChange);
  },
  componentWillUnmount: function() {
    this.subscriptionListenerToken.remove();
    this.reviewListenerToken.remove();
  },
  onChange: function() {
    this.setState({
      subscription: SubscriptionStore.findById(1),
      reviews: ReviewStore.findBySubscriptionId(1)
    });
  },
  render: function() {
    if (this.state.reviews === undefined || this.state.subscription === undefined ||
    this.state.reviews.length === 0 || this.state.subscription.length === 0) {
      return <div>CHART GOES HERE</div>;
    } else {
      var ratingFrequencies = [0, 0, 0, 0, 0];
      this.state.reviews.forEach(function(review) {
        ratingFrequencies[review.rating-1] += 1;
      });

      var total = ratingFrequencies.reduce(add, 0);
      ratingFrequencies = ratingFrequencies.map(function(freq) {
        return freq/total * 100;
      });

      var data = [
        {
          value: ratingFrequencies[0],
          color:  "#ff6666",
          highlight: "#ff0000",
          label: "1 Star"
        },
        {
          value: ratingFrequencies[1],
          color:  "#ffb366",
          highlight: "#ff8000",
          label: "2 Stars"
        },
        {
          value: ratingFrequencies[2],
          color:  "#ffff66",
          highlight: "#ffff00",
          label: "3 Stars"
        },
        {
          value: ratingFrequencies[3],
          color:  "#d9ff66",
          highlight: "#bfff00",
          label: "4 Stars"
        },
        {
          value: ratingFrequencies[4],
          color:  "#8cff66",
          highlight: "#40ff00",
          label: "5 Stars"
        },
      ];

      return <div className="col-md-8 col-md-offset-2">
        <DonutChart data={data}  options={{responsive: true}}/>
      </div>;
      }
  }
});

module.exports = Chart;
