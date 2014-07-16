class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.integer :user_id
      t.integer :default_currency_id

      t.timestamps
    end
  end
end
