class RegistrationsController < Devise::RegistrationsController

  # POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        @messages = {errors: flash[:notice], redirect: after_sign_up_path_for(resource)}
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        @messages = {errors: flash[:notice], redirect: after_inactive_sign_up_path_for(resource)}

      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      @messages = {errors: resource.errors.full_messages}
    end
  end

  protected

  def invalid_login_attempt
    set_flash_message(:alert, :invalid)
    {errors: flash[:alert]}
  end

end