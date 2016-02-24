class Api::UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login_user!(user)
      render json: user
    else
      render json: {status: 404}
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
