class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :transaction_type_id
      t.integer :currency_id
      t.integer :category_id
      t.string :title
      t.float :amount
      t.date :date

      t.timestamps
    end
  end
end
