class Sum < ActiveRecord::Base

  class << self
    def add(value, date, user_id)
      juid = generate_year_uid(date)
      year_sum = find_or_create_by(uid: juid[:uid])
      year_sum.value += value
      year_sum.user_id = user_id
      year_sum.type = 'Y'
      year_sum.user_id = user_id
      year_sum.date_range = juid[:range]

      if year_sum.save
        muid = generate_month_uid(date)
        month_sum = find_or_create_by(uid: muid[:uid])
        month_sum.value += value
        month_sum.parent_id = year_sum.id
        month_sum.user_id = user_id
        month_sum.date_range = muid[:range]
        month_sum.type = 'M'

        if month_sum.save
          duid = generate_day_uid(date)
          day_sum = find_or_create_by(uid: duid[:uid])
          day_sum.value += value
          day_sum.parent_id = month_sum.id
          day_sum.user_id = user_id
          day_sum.date_range = duid[:range]
          day_sum.type = 'D'
          day_sum.save
        end
      end
    end

    def generate_day_uid(date)
      generate_uid('D', date)
    end

    def generate_month_uid(date)
      generate_uid('M', date)
    end

    def generate_year_uid(date)
      generate_uid('Y', date)
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
