class CategoriesController < ApplicationController
  respond_to :json

  def index
    transaction_type_id = TransactionType.find_by_name(params[:type]).try(:id)
    @categories = current_user.categories.where(transaction_type_id: transaction_type_id)

    respond_with @categories
  end
end
