var ReviewFrontendActions = require('../actions/reviewFrontendActions.js');

var ReviewUtil = {
  // create new review
  createReview: function(reviewParams, callback) {
    $.ajax({
      url : "/api/reviews",
      type: "POST",
      data: reviewParams,
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.receiveNewReview(data);
      }
    });
  },

  //edit review
  editReview: function(reviewParams, callback) {
    $.ajax({
      url : "/api/reviews/"+reviewParams.id,
      type: "PATCH",
      data: reviewParams,
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.updateReview(data);
      }
    });
  },

  // all reviews (on app load)
  fetchAllReviews: function(callback) {
    $.ajax({
      url : "/api/reviews",
      type: "GET",
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.receiveAllReviews(data);
      }
    });
  }
};

module.exports = ReviewUtil;
