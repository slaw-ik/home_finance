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

  after_create :create_sum
  after_update :update_sum
  after_destroy :destroy_sum

  private
  def create_sum
    Sum.add(self.amount, self.transaction_type_id, self.date, self.user_id)
  end

  def update_sum
    amount_diff = self.amount - self.amount_was
    date_changed = (self.date != self.date_was)
    amount_changed = (amount_diff != 0)


    if date_changed
      Sum.add(-self.amount_was, self.transaction_type_id, self.date_was, self.user_id)
      Sum.add(self.amount, self.transaction_type_id, self.date, self.user_id)
    else
      if amount_changed
        Sum.add(amount_diff, self.transaction_type_id, self.date, self.user_id)
      end
    end
  end

  def destroy_sum
    Sum.add(-self.amount, self.transaction_type_id, self.date, self.user_id)
  end
end
