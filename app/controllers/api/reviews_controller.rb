class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render json: @reviews
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])

    if @review.update(review_params)
      @reviews = Review.all
      render json: @reviews
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])

    if @review
      if @review.destroy
        @reviews = Review.all
        render json: @reviews
      else
        render json: { status: 404 }
      end
    else
      render json: { status: 404 }
    end
  end

  private

  def review_params
    params.require(:review).permit(:author_id, :subscription_id, :rating, :comment, :frequency)
  end
end
