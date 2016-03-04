var React = require('react');
var RadarChart = require('react-chartjs').Radar;

var ReviewsRadarChart = React.createClass({
  getInitialState: function() {
    return {
      daily: false,
      weekly: false,
      monthly: false,
      yearly: false,
      never: false
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

  render: function() {
    var data = {
      labels: this.props.labels,
      datasets: [
        {
          label: "Usage Rate (Daily)",
          fillColor: "rgba(0,128,0,0.2)",
          strokeColor: "rgba(0,128,0,1)",
          pointColor: "rgba(0,128,0,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(144,238,144,1)",
          data: this.props.dailyUsageData
        },
        {
          label: "Usage Rate (Weekly)",
          fillColor: "rgba(0,0,128,0.2)",
          strokeColor: "rgba(0,0,128,1)",
          pointColor: "rgba(0,0,128,1)",
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
        },
        {
          label: "Usage Rate (Yearly)",
          fillColor: "rgba(255,0,0,0.2)",
          strokeColor: "rgba(255,0,0,1)",
          pointColor: "rgba(255,0,0,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.props.yearlyUsageData
        },
        {
          label: "Usage Rate (Never)",
          fillColor: "rgba(128,0,128,0.2)",
          strokeColor: "rgba(128,0,128,1)",
          pointColor: "rgba(128,0,128,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.props.neverUsageData
        }
      ]
    };

    var chartOptions = {
      responsive: true,
      scaleLineColor : "#707070"
    };

    var chartData = {
      labels: data.labels,
      datasets: []
    };
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
    if(this.state.yearly) {
      chartData.datasets.push(data.datasets[3]);
    }
    if(this.state.never) {
      chartData.datasets.push(data.datasets[4]);
    }

    if (chartData.datasets.length === 0) {
      chartData.datasets = data.datasets;
    }

    return <div className="col-md-10 col-md-offset-1 reviews-radar-chart">
      <br/>
      <br/>
      <h3> Frequency of Use </h3>
      <br/>
      <br/>
      <div className="row">
        <div className="col-md-10">
          <RadarChart redraw={true} data={chartData} options={chartOptions}/>
        </div>
        <div className="col-md-2">
          <form className="container-fluid reviews-radar-checkbox">
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
            <br/>
            <label style={{color: data.datasets[3].strokeColor}}>
              <input type="checkbox" value="2" checked={this.state.yearly} onClick={this.handleClick}/>
              Yearly
            </label>
            <br/>
            <label style={{color: data.datasets[4].strokeColor}}>
              <input type="checkbox" value="1" checked={this.state.never} onClick={this.handleClick}/>
              Never
            </label>
          </form>
        </div>
      </div>
    </div>;
  }
});

module.exports = ReviewsRadarChart;
