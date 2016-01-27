class AuthController < ApplicationController
  include AuthParams

  def index
    if params[:back]
      session[:back] = params[:back]
    end
  end

  def login
    if auth_params
      user_session = authenticate_with_cdx
      if @auth_error
        flash[:error] = @auth_error
        redirect_to login_url
      else
        session[:user_session_id] = user_session.token
        flash[:message] = 'Success!'
        redirect_to params[:back] || session[:back] || root_path
      end
    else
      flash[:error] = 'Missing user_id and/or password'
      redirect_to login_url
    end 
  end

  def logout
    if authenticated?
      if user_session
        user_session.expire
      end
      session.delete(:user_session_id)
      flash[:message] = 'You have been signed out.'
      redirect_to root_path
    else
      flash[:error] = 'You were not logged in.'
      redirect_to root_path
    end
  end
end
