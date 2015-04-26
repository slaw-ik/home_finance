class CreateSums < ActiveRecord::Migration
  def change
    create_table :sums do |t|
      t.integer :parent_id
      t.integer :user_id
      t.string :type
      t.string :date_range
      t.string :uid
      t.float :value, default: 0

      t.timestamps
    end
  end
end
