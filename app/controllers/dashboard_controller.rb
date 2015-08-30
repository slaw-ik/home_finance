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
          {name: trans.category.name, y: trans.sum_amount, id: trans.category.id}
        }
        result ={columns: transactions, total: sum.round(2)}
      when 'tendency'
        tendency = Sum.get_tendency(date_from, date_to)

        debet_sums = {}
        credit_sums = {}

        tendency[:debet_sums].each { |s| debet_sums[s.date_from.to_s] = s.value }
        tendency[:credit_sums].each { |s| credit_sums[s.date_from.to_s] = s.value }
        dates = (debet_sums.keys | credit_sums.keys).sort
        debets = dates.map { |d| [Time.parse(d).utc.to_i*1000, debet_sums[d]] }
        credits = dates.map { |d| [Time.parse(d).utc.to_i*1000, credit_sums[d]] }

        result = {series: [{name: 'Розхід',
                            data: debets,
                            color: '#f7a35c'},
                           {name: 'Дохід',
                            data: credits,
                            color: '#90ed7d'}
        ]}

      when 'bar'
        d_sums = Sum.month_debets(date_from, date_to)
        c_sums = Sum.month_credits(date_from, date_to)

        debet_sums = {}
        credit_sums = {}

        d_sums.each { |s| debet_sums[s.date_from.to_s] = s.value }
        c_sums.each { |s| credit_sums[s.date_from.to_s] = s.value }
        dates = (debet_sums.keys | credit_sums.keys).sort
        debets = dates.map { |d| [Time.parse(d).utc.to_i*1000, debet_sums[d]] }
        credits = dates.map { |d| [Time.parse(d).utc.to_i*1000, credit_sums[d]] }


        result = {series: [{name: 'Розхід',
                            data: debets,
                            color: '#f7a35c'},
                           {name: 'Дохід',
                            data: credits,
                            color: '#90ed7d'}
        ]}
      when 'bucket_state'
        b_states = Sum.day_bucket_sates(date_from, date_to)

        bucket_states = {}
        b_states.each { |s| bucket_states[s.date_from.to_s] = s.value }
        dates = bucket_states.keys.sort
        states = dates.map { |d| [Time.parse(d).utc.to_i*1000, bucket_states[d]] }

        result = {series: [{name: 'Стан гаманця',
                            data: states,
                            type: 'area'}
        ]}
      else
        # type code here
    end

    render json: result
  end
end
