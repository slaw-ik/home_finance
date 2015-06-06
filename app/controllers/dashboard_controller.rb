class DashboardController < ApplicationController
  def report
    result = {}
    if params[:type] == 'debet'
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
    elsif params[:type] == 'tendency'
      date_from = params[:dateFrom]
      date_to = params[:dateTo]

      if (date_to.to_date-date_from.to_date) > 60
        debet_sums = Sum.select(:value, :date_from)
                         .where(:interval_type_id => 2, :sum_type_id => 1)
                         .where("date_from >= '#{params[:dateFrom]}'")
                         .where("date_to <= '#{params[:dateTo]}'")

        credit_sums = Sum.select(:value, :date_from)
                         .where(:interval_type_id => 2, :sum_type_id => 2)
                         .where("date_from >= '#{params[:dateFrom]}'")
                         .where("date_to <= '#{params[:dateTo]}'")

      else
        debet_sums = Sum.select(:value, :date_from)
                         .where(:interval_type_id => 3, :sum_type_id => 1)
                         .where("date_from >= '#{params[:dateFrom]}'")
                         .where("date_to <= '#{params[:dateTo]}'")

        credit_sums = Sum.select(:value, :date_from)
                          .where(:interval_type_id => 3, :sum_type_id => 2)
                          .where("date_from >= '#{params[:dateFrom]}'")
                          .where("date_to <= '#{params[:dateTo]}'")

      end
      result ={columns: [debet_sums.map { |s| s.date_from }.unshift('x'),
                         debet_sums.map { |s| s.value }.unshift('Debet'),
                         credit_sums.map { |s| s.value }.unshift('Credit')]}
    end

    render json: result
  end
end
