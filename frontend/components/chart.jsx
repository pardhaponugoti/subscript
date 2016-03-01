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
  render: function() {
    if (this.props.reviews === undefined || this.props.subscription === undefined ||
    this.props.reviews.length === 0 || this.props.subscription.length === 0) {
      return <div>NO CHART DATA</div>;
    } else {
      var ratingFrequencies = [0, 0, 0, 0, 0];
      this.props.reviews.forEach(function(review) {
        ratingFrequencies[review.rating-1] += 1;
      });

      var total = ratingFrequencies.reduce(add, 0);
      ratingFrequencies = ratingFrequencies.map(function(freq) {
        return Math.round(freq/total * 100);
      });

      var labels =  ["★".repeat(1), "★".repeat(2), "★".repeat(3), "★".repeat(4), "★".repeat(5)];

      var lineData = {
          labels: labels,
          datasets: [
            {
              label: "Ratings",
              fillColor: ["red", "orange", "yellow", "yellow-green", "green"],
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: ratingFrequencies
            }
          ]
      };

      var barData = {
        labels: labels,
        datasets: [
            {
                label: "Ratings",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: ratingFrequencies
            }
          ]
      };

      var donutData = [
        {
          value: ratingFrequencies[0],
          color:  "#ff6666",
          highlight: "#ff0000",
          label: labels[0]
        },
        {
          value: ratingFrequencies[1],
          color:  "#ffb366",
          highlight: "#ff8000",
          label: labels[1]
        },
        {
          value: ratingFrequencies[2],
          color:  "#ffff66",
          highlight: "#ffff00",
          label: labels[2]
        },
        {
          value: ratingFrequencies[3],
          color:  "#d9ff66",
          highlight: "#bfff00",
          label: labels[3]
        },
        {
          value: ratingFrequencies[4],
          color:  "#00e600",
          highlight: "#40ff00",
          label: labels[4]
        },
      ];

      return <div className="col-md-8 col-md-offset-2 container-fluid">
        <h2 className="chart-title">{this.props.subscription.name} Ratings</h2>
        <DonutChart data={donutData}  options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>", segmentStrokeColor : "#fff", segmentStrokeWidth : 2}}/>



        <BarChart data={barData} options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"}}/>
        <LineChart data={lineData} options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"}} />
      </div>;
      }
  }
});

module.exports = Chart;
