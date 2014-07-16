class Currency < ActiveRecord::Base
  has_many :courses
  has_many :transactions
  has_many :settings
end
