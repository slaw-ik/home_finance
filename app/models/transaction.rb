class Transaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :currency
  belongs_to :category
end
