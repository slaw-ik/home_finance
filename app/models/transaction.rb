class Transaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :currency
  belongs_to :category

  validates :title, presence: true
  validates :amount, presence: true
  validates :category_id, presence: true
  validates :amount, numericality: { greater_than: 0 }
end
