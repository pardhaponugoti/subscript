var React = require('react');
var LineChart = require("react-chartjs").Line;
var RadarChart = require("react-chartjs").Radar;
var BarChart = require("react-chartjs").Bar;
var DonutChart = require("react-chartjs").Doughnut;
var ReactD3 = require("react-d3-components");
var d3 = require("react-d3-components").d3;
var ScatterPlot = require("react-d3-components").ScatterPlot;

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

function returnStyle(value) {
  if (value < 2) {
    return {color:"red"};
  } else if (value < 3) {
    return {color: "orange"};
  } else if (value < 4) {
    return {color: "#ace600"};
  } else {
    return {color: "green"};
  }
}

var Chart = React.createClass({
  render: function() {
    var ratingFrequencies = [0, 0, 0, 0, 0];
    var usageFrequencies = [0, 0, 0, 0, 0];
    var avgRating = 0;
    var avgUsage = 0;
    var medianRating = 0;
    var medianUsage = 0;
    var usage = [];
    var ratings = [];
    var scatterData = {};
    scatterData.label = "Ratings vs. Frequency";
    scatterData.values = [];


    if (this.props.reviews === undefined || this.props.subscription === undefined ||
    this.props.reviews.length === 0 || this.props.subscription.length === 0) {
      return <div className="loading-container">
        <div className="jawn"></div>
      </div>;
    } else {
      this.props.reviews.forEach(function(review) {
        ratings.push(review.rating);
        ratingFrequencies[review.rating-1] += 1;
        avgRating += review.rating;

        usage.push(review.frequency);
        usageFrequencies[review.frequency-1] += 1;
        avgUsage += review.frequency;

        scatterData.values.push(
          {x: review.frequency + Math.random() * (0.3) - 0.15,
           y: review.rating + Math.random() * (0.3) - 0.15}
         );
      });

      var total = ratingFrequencies.reduce(add, 0);

      avgRating = Number(Math.round((avgRating/total)+'e2')+'e-2');
      medianRating = median(ratings);
      var modeRating = ratingFrequencies.indexOf(Math.max.apply(Math, ratingFrequencies)) + 1;

      avgUsage = Number(Math.round((avgUsage/total)+'e2')+'e-2');
      medianUsage = median(usage);
      var modeUsage = usageFrequencies.indexOf(Math.max.apply(Math, usageFrequencies)) + 1;

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

      var radarData = {
        labels: ["Daily", "Weekly", "Monthly", "Yearly", "Never"],
        datasets: [
          {
            label: "Usage Rate",
            fillColor: "rgba(0,128,0,0.2)",
            strokeColor: "rgba(0,128,0,1)",
            pointColor: "rgba(0,128,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(144,238,144,1)",
            data: usageFrequencies.reverse()
          }
        ]
      };

      var xScale = d3.scale.ordinal().domain(["Never", "Yearly", "Monthly", "Weekly", "Daily"]).range([1,2,3,4,5]);

      return <div className="col-md-8 col-md-offset-2 container-fluid">
        <br/>
        <div className="row">
          <h4 className="chart-title">{this.props.subscription.name} Ratings</h4>
          <div className="col-md-3">
            <h4>Average Rating:</h4><h2 style={returnStyle(avgRating)}>{avgRating}</h2>
            <h4>Median Rating:</h4><h2 style={returnStyle(medianRating)}>{medianRating}</h2>
            <h4>Most Common:</h4><h2 style={returnStyle(modeRating)}>{modeRating}</h2>
          </div>
          <div className="col-md-9">
            <DonutChart data={donutData}  options={{responsive: true,
                tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
                segmentStrokeColor : "#fff",
                segmentStrokeWidth : 2}}/>
          </div>
        </div>
        <br/>
        <br/>
        <div className="row">
          <h4 className="chart-title">{this.props.subscription.name} Usage Rate </h4>
          <div className="col-md-3">
            <h4>Average Usage:</h4><h2 style={returnStyle(avgUsage)}>{avgUsage}</h2>
            <h4>Median Usage:</h4><h2 style={returnStyle(medianUsage)}>{medianUsage}</h2>
            <h4>Most Common:</h4><h2 style={returnStyle(modeUsage)}>{modeUsage}</h2>
          </div>
          <div className="col-md-9">
            <RadarChart data={radarData}  options={{responsive: true, scaleLineColor : "#707070"}}/>
          </div>
        </div>
        <br/>
        <br/>
        <div className="scatter-plot-div">
          <h4 className="chart-title"> Ratings vs Frequency Scatter Plot </h4>
          <br/>
          <ScatterPlot
                data={scatterData}
                xAxis={{label: "Frequency of Use"}}
                yAxis={{label: "Rating"}}
                width={600}
                height={600}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
        </div>
      </div>;
      }
  }
});
module.exports = Chart;
