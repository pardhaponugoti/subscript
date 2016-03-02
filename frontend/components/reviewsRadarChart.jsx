var React = require('react');
var RadarChart = require('react-chartjs').Radar;

var ReviewsRadarChart = React.createClass({
  getInitialState: function() {
    return {
      daily: true,
      weekly: true,
      monthly: true,
      yearly: true,
      never: true
    };
  },

  handleClick: function(e) {
    if (parseInt(e.target.value) === 5) {
      this.setState({
        daily: !this.state.daily
      });
    } else if (parseInt(e.target.value) === 4) {
      this.setState({
        weekly: !this.state.weekly
      });
    } else if (parseInt(e.target.value) === 3) {
      this.setState({
        monthly: !this.state.monthly
      });
    } else if (parseInt(e.target.value) === 2) {
      this.setState({
        yearly: !this.state.yearly
      });
    } else {
      this.setState({
        never: !this.state.never
      });
    }
  },

  // componentDidMount: function() {
  //   if (this.refs.radarChart) {
  //     var legend = this.refs.radarChart.getChart().generateLegend();
  //
  //     this.setState({
  //       legend: legend
  //     });
  //   }
  // },
  render: function() {
    console.log("renderChartPage");
    // var legend = this.state && this.state.legend || '';
    var data = {};
    data = {
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
      responsive: true
    };
    // tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"

    var chartData = {};
    chartData.labels = data.labels;
    chartData.datasets = [];
    if (this.state.daily) {
      chartData.datasets.push(data.datasets[0]);
    }
    if(this.state.weekly) {
      chartData.datasets.push(data.datasets[1]);
    }
    if(this.state.monthly) {
      chartData.datasets.push(data.datasets[2]);
    }
    debugger;
    return <div className="col-md-10 col-md-offset-1 reviews-radar-chart">
      <h2> Usage Rates </h2>
      <br/>
      <div className="col-md-8">
        <RadarChart data={chartData} options={chartOptions}/>;
      </div>
      <div className="col-md-4 reviews-radar-checkbox">
        <form className="container-fluid">
          <label style={{color: data.datasets[0].strokeColor}}>
            <input type="checkbox" value="5" checked={this.state.daily} onClick={this.handleClick}/>
            Daily
          </label>
          <br/>
          <label style={{color: data.datasets[1].strokeColor}}>
            <input type="checkbox" value="4" checked={this.state.weekly} onClick={this.handleClick}/>
            Weekly
          </label>
          <br/>
          <label style={{color: data.datasets[2].strokeColor}}>
            <input type="checkbox" value="3" checked={this.state.monthly} onClick={this.handleClick}/>
            Monthly
          </label>
        </form>
      </div>
    </div>;
  }
});

module.exports = ReviewsRadarChart;

// <br/>
// <label>
//   <input type="checkbox" value="2" checked={this.state.yearly} onClick={this.handleClick}/>
//   Yearly
// </label>
// <br/>
// <label>
//   <input type="checkbox" value="1" checked={this.state.never} onClick={this.handleClick}/>
//   Never
// </label>
// <input type="checkbox" name="frequency" value="0" {self.state.checked.includes(0) ? "checked" : ""} onChange={self.handleClick0}/>
// <text style={{color: data.datasets[0].strokeColor}}>Daily</text><br/>
// <input type="checkbox" name="frequency" value="1" {self.state.checked.includes(1) ? "checked" : ""} onChange={self.handleClick}/>
// <text style={{color: data.datasets[1].strokeColor}}>Weekly</text><br/>
// <input type="checkbox" name="frequency" value="2" {self.state.checked.includes(2) ? "checked" : ""} onChange={self.handleClick0}/>
// <text style={{color: data.datasets[2].strokeColor}}>Monthly</text><br/>

// <input style={{color: data.datasets[3].strokeColor}} type="checkbox" name="vehicle" value="Yearly"/>Yearly<br/>
// <input style={{color: data.datasets[4].strokeColor}} type="checkbox" name="vehicle" value="Never"/>Never<br/>
