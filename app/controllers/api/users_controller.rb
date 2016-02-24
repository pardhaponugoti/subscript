class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if user.save
      login_user!(@user)
      render :show
    else
      render json: { status: 404 }
    end
  end

  def index
    @users = User.all
    render :index
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
