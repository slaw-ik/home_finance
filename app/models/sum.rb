class Sum < ActiveRecord::Base
  belongs_to :user
  belongs_to :sum_type
  belongs_to :interval_type

  class << self
    def add(value, transaction_type_id, date, user_id)

      transaction_type = TransactionType.find(transaction_type_id)

      if transaction_type.name == 'debet'
        generate_sums_for_transaction(date, SumType.find_by_name('D'), user_id, value)
        # generate_sums_for_transaction(date, SumType.find_by_name('B'), user_id, -value)
      elsif transaction_type.name == 'credit'
        generate_sums_for_transaction(date, SumType.find_by_name('C'), user_id, value)
        # generate_sums_for_transaction(date, SumType.find_by_name('B'), user_id, value)
      end
    end

    def generate_sums_for_transaction(date, sum_type, user_id, value)
      year_sum = create_or_update_sum(value, 'Y', sum_type, date, user_id)

      if year_sum.save
        month_sum = create_or_update_sum(value, 'M', sum_type, date, user_id, year_sum)

        if month_sum.save
          day_sum = create_or_update_sum(value, 'D', sum_type, date, user_id, month_sum)
          day_sum.save
        end
      end
    end

    def create_or_update_sum(value, type, sum_type, date, user_id, parent=nil)

      uid = generate_uid(type, date)
      sum = find_or_create_by(uid: uid[:uid], sum_type: sum_type)
      sum.assign_attributes({
                                user_id: user_id,
                                interval_type: IntervalType.find_by_name(type),
                                sum_type: sum_type,
                                date_range: uid[:range],
                                parent_id: parent && parent.id})
      sum.value += value
      sum
    end

    def generate_uid(s, date)
      case s
        when 'D'
          range = date.to_date.to_s
        when 'M'
          range = "#{date.to_date.beginning_of_month}:#{date.to_date.end_of_month}"
        when 'Y'
          range = "#{date.to_date.beginning_of_year}:#{date.to_date.end_of_year}"
        else
          raise StandardError, "Wrong attributes (s=#{s.inspect}, date=#{date.inspect})"
      end
      {uid: "#{s}:#{range}", range: range}
    end
  end
end
