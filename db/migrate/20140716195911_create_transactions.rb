class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :currency_id
      t.integer :category_id
      t.string :title
      t.float :amount

      t.timestamps
    end
  end
end
