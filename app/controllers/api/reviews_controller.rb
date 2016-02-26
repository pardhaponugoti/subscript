class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render :index
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: { status: 404 }
    end
  end

  private

  def review_params
    params.require(:review).permit(:author_id, :subscription_id, :rating, :comment, :frequency)
  end
end
