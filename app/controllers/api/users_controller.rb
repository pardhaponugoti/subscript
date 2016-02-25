class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
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

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: { status: 404 }
    end
  end

  def destroy
    @user = User.find(params[:id])

    if @user
      @user.destroy
      render json: { id: params[:id] }
    else
      render json: { status: 404 }
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name,
                                :location, :date_of_birth, :image)
  end

end
