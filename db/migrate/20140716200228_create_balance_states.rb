class CreateBalanceStates < ActiveRecord::Migration
  def change
    create_table :balance_states do |t|
      t.integer :user_id
      t.float :debet
      t.float :credet
      t.date :on_date

      t.timestamps
    end
  end
end
