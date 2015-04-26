namespace :db do
  desc "Fill database"
  task :populate => :environment do
    require 'populator'
    require 'faker'

    Transaction.delete_all

    Transaction.populate 30 do |transaction|
      transaction.user_id = User.first.id
      transaction.transaction_type_id = TransactionType.first.id..TransactionType.last.id
      transaction.currency_id = User.first.setting.default_currency_id
      transaction.category_id = Category.where(transaction_type_id: transaction.transaction_type_id).first.id..Category.where(transaction_type_id: transaction.transaction_type_id).last.id
      transaction.title = Populator.words(1..3)

      if TransactionType.find(transaction.transaction_type_id).name == 'debet'
        amount_range = 1..50
      else
        amount_range = 500..1500
      end
      transaction.amount = amount_range

      date = 3.month.ago..Time.now

      transaction.date = date
      transaction.created_at = date
      transaction.updated_at = date
    end
  end
end