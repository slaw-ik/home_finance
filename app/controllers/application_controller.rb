class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    prepare_data_for(current_user)
    super
  end

  def index

  end

  private

  def prepare_data_for(user = nil)
    if user && user.sign_in_count == 1
      BalanceState.create!(user: user) if user.balance_states.blank?
      Setting.create!(user: user, default_currency: Currency.first) if user.setting.blank?
    end
  end
end