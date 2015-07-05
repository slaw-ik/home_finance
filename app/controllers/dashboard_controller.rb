class DashboardController < ApplicationController
  def report
    result = {}
    type = params[:type]
    date_from = params[:dateFrom]
    date_to = params[:dateTo]

    case type
      when 'debet'
        sum = 0
        transaction_type = TransactionType.find_by_name('debet')
        transactions = Transaction.includes(:category).group(:category_id)
                           .where(:date => date_from..date_to, :transaction_type => transaction_type)
                           .select(:category_id, "SUM(amount) as sum_amount")
                           .collect { |trans|
          sum +=trans.sum_amount
          [trans.category.name, trans.sum_amount]
        }
        result ={columns: transactions, total: sum.round(2)}
      when 'tendency'
        tendency = Sum.get_tendency(date_from, date_to)

        result = {columns: [tendency[:debet_sums].map { |s| s.date_from }.unshift('debet_dates'),
                            tendency[:credit_sums].map { |s| s.date_from }.unshift('credit_dates'),
                            tendency[:debet_sums].map { |s| s.value }.unshift('Debet'),
                            tendency[:credit_sums].map { |s| s.value }.unshift('Credit')]}

      when 'bar'
        debet_sums = Sum.month_debets(date_from, date_to)
        credit_sums = Sum.month_credits(date_from, date_to)

        result = {columns: [debet_sums.map { |s| s.date_from }.unshift('debet_dates'),
                            credit_sums.map { |s| s.date_from }.unshift('credit_dates'),
                            debet_sums.map { |s| s.value }.unshift('Debet'),
                            credit_sums.map { |s| s.value }.unshift('Credit')]}
      when 'bucket_state'
        if (date_to.to_date-date_from.to_date) > 60
          bucket_states = Sum.month_bucket_sates(date_from, date_to)
        else
          bucket_states = Sum.day_bucket_sates(date_from, date_to)
        end

        result = {columns: [bucket_states.map { |s| s.date_from }.unshift('debet_dates'),
                            bucket_states.map { |s| s.value }.unshift('Bucket state')]}
      else
        # type code here
    end

    render json: result
  end
end
