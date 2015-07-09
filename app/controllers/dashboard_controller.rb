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
          {name: trans.category.name, y: trans.sum_amount}
        }
        result ={columns: transactions, total: sum.round(2)}
      when 'tendency'
        tendency = Sum.get_tendency(date_from, date_to)

        debet_sums = {}
        credit_sums = {}

        tendency[:debet_sums].each { |s| debet_sums[s.date_from.to_s] = s.value }
        tendency[:credit_sums].each { |s| credit_sums[s.date_from.to_s] = s.value }
        dates = (debet_sums.keys | credit_sums.keys).sort
        debets = dates.map { |d| debet_sums[d] }
        credits = dates.map { |d| credit_sums[d] }


        result = {categories: dates,
                  series: [{name: 'Debet',
                            data: debets},
                           {name: 'Credit',
                            data: credits}
                  ]}

      when 'bar'
        d_sums = Sum.month_debets(date_from, date_to)
        c_sums = Sum.month_credits(date_from, date_to)

        debet_sums = {}
        credit_sums = {}

        d_sums.each { |s| debet_sums[s.date_from.to_s] = s.value }
        c_sums.each { |s| credit_sums[s.date_from.to_s] = s.value }
        dates = (debet_sums.keys | credit_sums.keys).sort
        debets = dates.map { |d| debet_sums[d] }
        credits = dates.map { |d| credit_sums[d] }


        result = {categories: dates,
                  series: [{name: 'Debet',
                            data: debets},
                           {name: 'Credit',
                            data: credits}
                  ]}
      when 'bucket_state'
        if (date_to.to_date-date_from.to_date) > 60
          bucket_states = Sum.month_bucket_sates(date_from, date_to)
        else
          bucket_states = Sum.day_bucket_sates(date_from, date_to)
        end

        result = {columns: [bucket_states.map { |s| s.date_from }.unshift('debet_dates'),
                            bucket_states.map { |s| s.value }.unshift('Bucket state')]}

        result = {categories: bucket_states.map { |s| s.date_from },
                  series: [{name: 'Bucket state',
                            data: bucket_states.map { |s| s.value }}
                  ]}
      else
        # type code here
    end

    render json: result
  end
end
