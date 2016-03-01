var React = require('react');
var RadarChart = require('react-chartjs').Radar;

var ReviewsRadarChart = React.createClass({
  getInitialState: function() {
    return {
      checked: [0,1,2]
    };
  },
  componentWillReceiveProps: function() {
    this.setState({
      checked: [0,1,2]
    });
  },

  handleClick: function(e) {
    e.preventDefault();
    debugger;
    if (e.target.checked) {
      debugger;
      if( this.state.checked.includes(parseInt(e.target.value)) ){
        console.log("already checked ---- error");
      } else {
        var checked = this.state.checked;
        checked.push(parseInt(e.target.value));
        debugger;
        this.setState({
          checked: checked
        });
      }
    } else {
      if( this.state.checked.includes(parseInt(e.target.value)) ){
        var idx = this.state.checked.indexOf(parseInt(e.target.value));
        if (idx > -1) {
          var checked = this.state.checked;
          checked.splice(idx, 1);
          this.setState({
            checked: checked
          });
        }
      } else {
        console.log("already unchecked --- error");
      }
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
    // var legend = this.state && this.state.legend || '';

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


    // <div dangerouslySetInnerHTML={{ __html: this.state.legend }} />
    return <div className="col-md-10 col-md-offset-1 reviews-radar-chart">
      <h2> Usage Rates </h2>
      <br/>
      <div className="col-md-8">
        <RadarChart ref="radarChart" data={data} options={chartOptions}/>
      </div>
      <div className="col-md-4 reviews-radar-checkbox">
        <form action="">
          <input type="checkbox" name="vehicle" value="0" checked={this.state.checked.includes(0)} onChange={this.handleClick}/>
            <text style={{color: data.datasets[0].strokeColor}}>Daily</text><br/>
          <input type="checkbox" name="vehicle" value="1" checked={this.state.checked.includes(1)} onChange={this.handleClick}/>
            <text style={{color: data.datasets[1].strokeColor}}>Weekly</text><br/>
          <input type="checkbox" name="vehicle" value="2" checked={this.state.checked.includes(2)} onChange={this.handleClick}/>
            <text style={{color: data.datasets[2].strokeColor}}>Monthly</text><br/>
        </form>
      </div>
    </div>;
  }
});

module.exports = ReviewsRadarChart;


// <input style={{color: data.datasets[3].strokeColor}} type="checkbox" name="vehicle" value="Yearly"/>Yearly<br/>
// <input style={{color: data.datasets[4].strokeColor}} type="checkbox" name="vehicle" value="Never"/>Never<br/>
