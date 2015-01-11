class CategoriesController < ApplicationController
  respond_to :json

  def index
    categories = current_user.categories
    respond_with categories
  end
end
