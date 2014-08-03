class Currency < ActiveRecord::Base
  has_many :courses
  has_many :transactions
  has_many :settings

  accepts_nested_attributes_for :courses
  accepts_nested_attributes_for :transactions
  accepts_nested_attributes_for :settings
end
