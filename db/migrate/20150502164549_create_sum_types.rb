class CreateSumTypes < ActiveRecord::Migration
  def change
    create_table :sum_types do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
