class Transaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :currency
  belongs_to :category
  belongs_to :transaction_type

  validates :date, presence: true
  validates :title, presence: true
  validates :amount, presence: true
  validates :amount, numericality: {greater_than: 0}
  validates :category_id, presence: true
  validates :category_id, numericality: {greater_than: 0}
  validates :currency_id, presence: true
  validates :currency_id, numericality: {greater_than: 0}
  validates :transaction_type_id, presence: true

  after_save :add_sum

  private
  def add_sum
    puts "=============================================="
    self.inspect
    Sum.add(self.amount, self.date, self.user_id)
  end

end
