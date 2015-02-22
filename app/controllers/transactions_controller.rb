class TransactionsController < ApplicationController
  respond_to :json

  def index
    transaction_type_id = TransactionType.find_by_name(params[:type]).try(:id)
    @transactions = current_user.transactions.where(transaction_type_id: transaction_type_id)

    respond_with @transactions
  end

  def new
    # TODO need to remove in future
    @transaction = Transaction.new
    @categories = current_user.categories
  end

  def create
    transaction_type_id = TransactionType.find_by_name(params[:type]).id

    transaction = Transaction.new(user: current_user,
                                  title: params[:title],
                                  currency: Currency.find(params[:currency_id]),
                                  category: Category.find(params[:category_id]),
                                  amount: params[:amount].gsub(',', '.').to_f,
                                  transaction_type_id: transaction_type_id,
                                  date: params[:date].to_date)
    if transaction.save
      respond_with transaction, status: :created
    else
      respond_with transaction, status: :unprocessable_entity
    end
  end
end

private

def transaction_params
  params.require(:transaction).permit(:currency_id, :category_id, :title, :amount)
end
