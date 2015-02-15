class Category < ActiveRecord::Base
  belongs_to :user
  belongs_to :transaction_type
  has_many :transactions

  accepts_nested_attributes_for :transactions
end
