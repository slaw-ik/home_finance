class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.integer :currency_id
      t.float :value

      t.timestamps
    end
  end
end
