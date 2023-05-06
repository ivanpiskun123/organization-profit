class CreatePurchases < ActiveRecord::Migration[7.0]
  def change
    create_table :purchases do |t|
      t.integer :total_sum, null: false, default: 0
      t.integer :amount, null: false, default: 1

      t.belongs_to :consumable
      t.belongs_to :month

      t.timestamps
    end
  end
end
