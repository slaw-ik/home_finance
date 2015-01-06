class TransactionsController < ApplicationController
  respond_to :json

  def index
    @transactions = current_user.transactions
    respond_with @transactions
  end

  def new
    @transaction = Transaction.new
    @categories = current_user.categories
  end

  def create
    transaction = Transaction.new(transaction_params)
    transaction.user = current_user
    if transaction.save
      respond_with transaction, :status => :created
    else
      respond_with transaction, :status => :unprocessable_entity
    end
  end
end

private

def transaction_params
  params.require(:transaction).permit(:currency_id, :category_id, :title, :amount)
end
