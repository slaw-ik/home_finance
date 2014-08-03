class TransactionsController < ApplicationController
  def index
    @transactions = current_user.transactions
  end

  def new
    @transaction = Transaction.new
    @categories = current_user.categories
  end

  def create
    transaction = Transaction.new(transaction_params)
    transaction.user = current_user
    if transaction.save
      render :status => :created, nothing: true
    else
      render :status => :unprocessable_entity, json: transaction.errors
    end
  end
end

private

def transaction_params
  params.require(:transaction).permit(:currency_id, :category_id, :title, :amount)
end
