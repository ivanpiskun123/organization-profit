class CreateMonths < ActiveRecord::Migration[6.1]
  def change
    create_table :months do |t|
      t.date :date, null: false
      t.integer :sales_plan, null: false, default: 1

      t.timestamps
    end
  end
end
