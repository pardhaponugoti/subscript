class Api::SessionsController < ApplicationController
  def new
    if current_user
      render json: current_user
    else
      render json: "no current user"
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil?
      render status: 404
    else
      login_user!(user)
      render json: user
    end
  end

  def destroy
    logout_user!
    redirect_to root_url
  end

end
