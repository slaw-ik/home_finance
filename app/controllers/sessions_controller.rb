class SessionsController < Devise::SessionsController

  def create
    resource = User.find_for_database_authentication(email: params[:user][:email])
    return @messages = invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in :user, resource
      set_flash_message(:alert, '')
      return @messages = {redirect: after_sign_in_path_for(resource)}
    end

    @messages = invalid_login_attempt
  end

  protected

  def invalid_login_attempt
    set_flash_message(:alert, :invalid)
    {errors: flash[:alert]}
  end

end