class TransactionsController < ApplicationController
  respond_to :json

  def index
    transaction_type_id = TransactionType.find_by_name(params[:type]).try(:id)
    @transactions = current_user.transactions.where(transaction_type_id: transaction_type_id, date: params[:date])

    respond_with @transactions.as_json(include: {category: {only: :name},
                                                 currency: {only: :name}})
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
      respond_with(transaction.as_json(include: {category: {only: :name},
                                                 currency: {only: :name}}),
                   status: :created,
                   location: nil)
    else
      respond_with transaction, status: :unprocessable_entity
    end
  end

  def update
    transaction = current_user.transactions.find(params[:id])

    transaction.assign_attributes(title: params[:title],
                                  currency: Currency.find(params[:currency_id]),
                                  category: Category.find(params[:category_id]),
                                  amount: params[:amount].gsub(',', '.').to_f,
                                  date: params[:date].to_date)
    if transaction.save
      render json: transaction.as_json(include: {category: {only: :name},
                                                 currency: {only: :name}}),
             status: :ok
    else
      respond_with transaction, status: :unprocessable_entity
    end
  end

  def destroy
    transaction = current_user.transactions.find(params[:id])

    if transaction.destroy
      respond_with transaction, status: :success
    else
      respond_with transaction, status: :unprocessable_entity
    end

  end
end

private

def transaction_params
  params.require(:transaction).permit(:currency_id, :category_id, :title, :amount)
end
