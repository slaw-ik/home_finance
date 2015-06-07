class DashboardController < ApplicationController
  def report
    result = {}
    type = params[:type]
    date_from = params[:dateFrom]
    date_to = params[:dateTo]

    if type == 'debet'
      sum = 0
      transaction_type = TransactionType.find_by_name('debet')
      transactions = Transaction.includes(:category).group(:category_id)
                         .where(:date => date_from..date_to, :transaction_type => transaction_type)
                         .select(:category_id, "SUM(amount) as sum_amount")
                         .collect { |trans|
        sum +=trans.sum_amount
        [trans.category.name, trans.sum_amount]
      }
      result ={columns: transactions, total: sum}
    elsif type == 'tendency'
      if (date_to.to_date-date_from.to_date) > 60
        debet_sums = Sum.select(:value, :date_from)
                         .where(:interval_type_id => 2, :sum_type_id => 1)
                         .where("date_from >= '#{date_from}'")
                         .where("date_to <= '#{date_to}'")

        credit_sums = Sum.select(:value, :date_from)
                          .where(:interval_type_id => 2, :sum_type_id => 2)
                          .where("date_from >= '#{date_from}'")
                          .where("date_to <= '#{date_to}'")

      else
        debet_sums = Sum.select(:value, :date_from)
                         .where(:interval_type_id => 3, :sum_type_id => 1)
                         .where("date_from >= '#{date_from}'")
                         .where("date_to <= '#{date_to}'")

        credit_sums = Sum.select(:value, :date_from)
                          .where(:interval_type_id => 3, :sum_type_id => 2)
                          .where("date_from >= '#{date_from}'")
                          .where("date_to <= '#{date_to}'")

      end
      result ={columns: [debet_sums.map { |s| s.date_from }.unshift('debet_dates'),
                         credit_sums.map { |s| s.date_from }.unshift('credit_dates'),
                         debet_sums.map { |s| s.value }.unshift('Debet'),
                         credit_sums.map { |s| s.value }.unshift('Credit')]}

    elsif type == 'bar'
      debet_sums = Sum.select(:value, :date_from)
                       .where(:interval_type_id => 2, :sum_type_id => 1)
                       .where("date_from >= '#{date_from}'")
                       .where("date_to <= '#{date_to}'")

      credit_sums = Sum.select(:value, :date_from)
                        .where(:interval_type_id => 2, :sum_type_id => 2)
                        .where("date_from >= '#{date_from}'")
                        .where("date_to <= '#{date_to}'")

      result ={columns: [debet_sums.map { |s| s.date_from }.unshift('debet_dates'),
                         credit_sums.map { |s| s.date_from }.unshift('credit_dates'),
                         debet_sums.map { |s| s.value }.unshift('Debet'),
                         credit_sums.map { |s| s.value }.unshift('Credit')]}
    elsif type == 'bucket'
      if (date_to.to_date-date_from.to_date) > 60
        bucket_states = Sum.select(:value, :date_from)
                            .where(:interval_type_id => 2, :sum_type_id => 3)
                            .where("date_from >= '#{date_from}'")
                            .where("date_to <= '#{date_to}'")
      else
        bucket_states = Sum.select(:value, :date_from)
                            .where(:interval_type_id => 3, :sum_type_id => 3)
                            .where("date_from >= '#{date_from}'")
                            .where("date_to <= '#{date_to}'")
      end

      result ={columns: [bucket_states.map { |s| s.date_from }.unshift('debet_dates'),
                         bucket_states.map { |s| s.value }.unshift('Bucket state')]}
    end

    render json: result
  end
end
