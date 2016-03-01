var React = require('react');
var RadarChart = require('react-chartjs').Radar;
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;
var DonutChart = require("react-chartjs").Doughnut;

var SubscriptionStore = require('../stores/subscription.js');
var ReviewStore = require('../stores/review.js');

var ReviewsRadarChart = require('./reviewsRadarChart.jsx');

var AnalyticsPage = React.createClass({
  getInitialState: function() {
    return {
      reviews: ReviewStore.all(),
      subscriptions: SubscriptionStore.all()
    };
  },
  componentDidMount: function() {
    this.subscriptionListenerToken = SubscriptionStore.addListener(this.onSubscriptionChange);
    this.reviewListenerToken = ReviewStore.addListener(this.onReviewChange);
  },
  componentWillUnmount: function() {
    this.subscriptionListenerToken.remove();
    this.reviewListenerToken.remove();
  },

  onSubscriptionChange: function() {
    this.setState({
      subscriptions: SubscriptionStore.all()
    });
  },
  onReviewChange: function() {
    this.setState({
      reviews: ReviewStore.all()
    });
  },

  render: function() {
    if (this.state.subscriptions === undefined || this.state.reviews === undefined ||
      this.state.subscriptions.length === 0 || this.state.reviews.length === 0) {
      return <div>WAITING-FOR-LOAD</div>;
    } else {
      var radarData = {};
      var labels = [];
      var dailyUsageData = [];
      var weeklyUsageData = [];
      var monthlyUsageData = [];

      this.state.subscriptions.forEach(function(subscription) {
        var totalReviews = 0;
        var currentSubReviews = [];
        var currentSubDaily = [];
        var currentSubWeekly = [];
        var currentSubMonthly = [];
        var currentSubYearly = [];
        var currentSubNever = [];

        radarData[subscription.id] = {};
        currentSubReviews = ReviewStore.findBySubscriptionId(parseInt(subscription.id));
        totalReviews = currentSubReviews.length;

        if (totalReviews === 0) {
          return;
        }

        currentSubDaily = currentSubReviews.filter(function(review) {
          return review.frequency === 5;
        });
        currentSubWeekly = currentSubReviews.filter(function(review) {
          return review.frequency === 4;
        });
        currentSubMonthly = currentSubReviews.filter(function(review) {
          return review.frequency === 3;
        });
        currentSubYearly = currentSubReviews.filter(function(review) {
          return review.frequency === 2;
        });
        currentSubNever = currentSubReviews.filter(function(review) {
          return review.frequency === 1;
        });


        labels.push(subscription.name);
        dailyUsageData.push(currentSubDaily.length/totalReviews * 100);
        weeklyUsageData.push(currentSubWeekly.length/totalReviews * 100);
        monthlyUsageData.push(currentSubMonthly.length/totalReviews * 100);
        // radarData[subscription.id].pctDaily = currentSubDaily.length/totalReviews * 100;
        // radarData[subscription.id].pctWeekly = currentSubWeekly.length/totalReviews * 100;
        // radarData[subscription.id].pctMonthly = currentSubMonthly.length/totalReviews * 100;
        // radarData[subscription.id].pctYearly = currentSubYearly.length/totalReviews * 100;
        // radarData[subscription.id].pctNever = currentSubNever.length/totalReviews * 100;
      });

      return <div>
        <ReviewsRadarChart dailyUsageData={dailyUsageData} weeklyUsageData={weeklyUsageData}
          monthlyUsageData={monthlyUsageData} labels={labels}/>
      </div>;
    }

  }
});

module.exports = AnalyticsPage;
