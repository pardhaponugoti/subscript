var ReviewFrontendActions = require('../actions/reviewFrontendActions.js');

var ReviewUtil = {
  // create new review
  createReview: function(reviewParams, successCallback, errorCallback) {
    $.ajax({
      url : "/api/reviews",
      type: "POST",
      data: reviewParams,
      success: function(data) {
        console.log("success: " + data);
        if (successCallback) {
          successCallback();
        }
        ReviewFrontendActions.receiveNewReview(data);
      },
      error: function(data) {
        console.log("error: " + data);
        errorCallback(data.responseText);
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

  // delete Review
  deleteReview: function(reviewId, callback) {
    $.ajax({
      url : "/api/reviews/"+reviewId,
      type: "DELETE",
      data: { id: reviewId },
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.deleteReview(data);
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
