class Api::SubscriptionsController < ApplicationController
  def index
    @subscriptions = Subscription.all
    render :index
  end

end
