var React = require('react');
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;
var DonutChart = require("react-chartjs").Doughnut;

var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

function add(a, b) {
    return a + b;
}

function median(values) {
    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

var Chart = React.createClass({
  render: function() {
    var ratingFrequencies = [0, 0, 0, 0, 0];
    var avgRating = 0;
    var medianRating = 0;
    var ratings = [];


    if (this.props.reviews === undefined || this.props.subscription === undefined ||
    this.props.reviews.length === 0 || this.props.subscription.length === 0) {
      return <div>NO CHART DATA</div>;
    } else {
      this.props.reviews.forEach(function(review) {
        ratings.push(review.rating);
        ratingFrequencies[review.rating-1] += 1;
        avgRating += review.rating;
      });

      var total = ratingFrequencies.reduce(add, 0);
      avgRating = avgRating/total;
      medianRating = median(ratings);

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

      if (avgRating < 2) {
        var meancolor="red";
      } else if (avgRating < 3) {
        var meancolor = "orange";
      } else if (avgRating < 4) {
        var meancolor = "#ace600";
      } else {
        var meancolor = "green";
      }

      var meanStyle = {
        color: meancolor
      };

      if (medianRating < 2) {
        var mediancolor="red";
      } else if (medianRating < 3) {
        var mediancolor = "orange";
      } else if (medianRating < 4) {
        var mediancolor = "#ace600";
      } else {
        var mediancolor = "green";
      }

      var medianStyle = {
        color: mediancolor,
      };

      return <div className="col-md-8 col-md-offset-2 container-fluid">
        <h2 className="chart-title">{this.props.subscription.name} Ratings</h2>
        <br/>
        <div className="row">
          <div className="col-md-5">
            <h4>Average Rating:</h4><h2 style={meanStyle}>{avgRating}</h2>
            <h4>Median Rating:</h4><h2 style={medianStyle}>{medianRating}</h2>
          </div>
          <div className="col-md-7">
            <DonutChart data={donutData}  options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>", segmentStrokeColor : "#fff", segmentStrokeWidth : 2}}/>
          </div>
        </div>
        <div>
          INSERT FILTERS HERE
        </div>
      </div>;
      }
  }
});

// <BarChart data={barData} options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"}}/>
// <LineChart data={lineData} options={{responsive: true, tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"}} />

module.exports = Chart;
