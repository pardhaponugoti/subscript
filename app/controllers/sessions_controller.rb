class SessionsController < ApplicationController

  def new
    if current_user
      redirect_to root_url
    else
      render :new
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil?
      flash[:errors] = ["Incorrect email and/or password"]
      redirect_to new_session_url
    else
      login_user!(user)
      redirect_to root_url
    end
  end

  def destroy
    logout_user!
    redirect_to new_session_url
  end

end
