class CurrenciesController < ApplicationController
  respond_to :json

  def index
    currencies = Currency.all
    respond_with currencies
  end

end
