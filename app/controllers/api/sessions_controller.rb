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
    if current_user.nil?
      render json: {message: "successful sign out"}
    else
      render status: 404
    end
  end

end
