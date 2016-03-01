var React = require('react');
var RadarChart = require('react-chartjs').Radar;

var ReviewsRadarChart = React.createClass({
  render: function() {

    var data = {
      labels: this.props.labels,
      datasets: [
        {
          label: "Usage Rate (Daily)",
          fillColor: "rgba(144,238,144,0.2)",
          strokeColor: "rgba(144,238,144,1)",
          pointColor: "rgba(144,238,144,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(144,238,144,1)",
          data: this.props.dailyUsageData
        },
        {
          label: "Usage Rate (Weekly)",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.props.weeklyUsageData
        },
        {
          label: "Usage Rate (Monthly)",
          fillColor: "rgba(255,165,0,0.2)",
          strokeColor: "rgba(255,165,0,1)",
          pointColor: "rgba(255,165,0,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.props.monthlyUsageData
        }
      ]
    };

    var chartOptions = {
      responsive: true,
      tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"
    };

    
    return <div className="col-md-10 col-md-offset-1 reviews-radar-chart">
      <h2> Usage Rates </h2>
      <RadarChart data={data} options={chartOptions}/>
    </div>;
  }
});

module.exports = ReviewsRadarChart;
