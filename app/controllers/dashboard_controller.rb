class DashboardController < ApplicationController
  def report
    sum = 0
    transctions = Transaction.includes(:category).group(:category_id)
                      .where(:date => params[:dateFrom]..params[:dateTo])
                      .select(:category_id, "SUM(amount) as sum_amount")
                      .collect { |trans|
      sum +=trans.sum_amount
      [trans.category.name, trans.sum_amount]
    }

    render json: {columns: transctions, total: sum}
  end
end
