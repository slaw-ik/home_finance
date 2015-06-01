class DashboardController < ApplicationController
  def report
    result = {}
    # if params[:type] == 'debet'
      sum = 0
      type = TransactionType.find_by_name('debet')
      transactions = Transaction.includes(:category).group(:category_id)
      .where(:date => params[:dateFrom]..params[:dateTo], :transaction_type => type)
      .select(:category_id, "SUM(amount) as sum_amount")
      .collect { |trans|
        sum +=trans.sum_amount
        [trans.category.name, trans.sum_amount]
      }
      result ={columns: transactions, total: sum}
    # elsif params[:type] == 'tendency'
    #   date_from = params[:dateFrom]
    #   date_to = params[:dateTo]
    #
    #   if date_to-date_from > 60
    #
    #   else
    #   end

    # end

    render json: result
  end
end
