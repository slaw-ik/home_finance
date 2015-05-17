class Sum < ActiveRecord::Base
  belongs_to :user
  belongs_to :sum_type
  belongs_to :interval_type

  class << self
    def add(value, transaction_type_id, date, user_id)

      transaction_type = TransactionType.find(transaction_type_id)

      if transaction_type.name == 'debet'
        generate_sums_for_transaction(date, SumType.find_by_name('D'), user_id, value)
        generate_sums_for_transaction(date, SumType.find_by_name('B'), user_id, -value)
      elsif transaction_type.name == 'credit'
        generate_sums_for_transaction(date, SumType.find_by_name('C'), user_id, value)
        generate_sums_for_transaction(date, SumType.find_by_name('B'), user_id, value)
      end
    end

    def generate_sums_for_transaction(date, sum_type, user_id, value)
      year_sum = create_or_update_sum(value, IntervalType.find_by_name('Y'), sum_type, date, user_id)

      if year_sum.save
        month_sum = create_or_update_sum(value, IntervalType.find_by_name('M'), sum_type, date, user_id, year_sum)

        if month_sum.save
          day_sum = create_or_update_sum(value, IntervalType.find_by_name('D'), sum_type, date, user_id, month_sum)
          day_sum.save
        end
      end
    end

    def create_or_update_sum(value, interval_type, sum_type, date, user_id, parent=nil)
      uid = generate_uid(interval_type.name, date)
      if sum_type.name == 'B'
        sum = find_by(uid: uid[:uid], sum_type: sum_type)
        if sum
          sum.value += value
        else
          prev = where(interval_type: interval_type, sum_type: sum_type).where("date_to < ?", uid[:range][:date_to]).last
          sum = create(uid: uid[:uid],
                       value: prev.try(:value).to_i + value)
        end
        where(interval_type: interval_type, sum_type: sum_type).where("date_to > ?", uid[:range][:date_to]).update_all("value = value + #{value}")
      else
        sum = find_or_create_by(uid: uid[:uid],
                                sum_type: sum_type)
        sum.value += value
      end
      sum.assign_attributes(user_id: user_id,
                            interval_type: interval_type,
                            sum_type: sum_type,
                            date_from: uid[:range][:date_from],
                            date_to: uid[:range][:date_to],
                            parent_id: parent && parent.id)
      sum
    end

    def generate_uid(type, date)
      case type
        when 'D'
          range = {date_from: date.to_date, date_to: date.to_date}
        when 'M'
          range = {date_from: date.to_date.beginning_of_month, date_to: date.to_date.end_of_month}
        when 'Y'
          range = {date_from: date.to_date.beginning_of_year, date_to: date.to_date.end_of_year}
        else
          raise StandardError, "Wrong attributes (s=#{type.inspect}, date=#{date.inspect})"
      end
      {uid: "#{type}:#{range[:date_from].to_s}:#{range[:date_to].to_s}", range: range}
    end
  end
end
