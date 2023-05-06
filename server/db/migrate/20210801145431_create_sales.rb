class CreateSales < ActiveRecord::Migration[6.1]
  def change
    create_table :sales do |t|
      t.integer :amount, null: false, default: 1
      t.integer :total_sum, null: false, default: 0
      t.boolean :payment_method, null: false, default: true
      t.boolean :trade_form, null: false, default: true
      t.belongs_to :month
      t.belongs_to :product

      t.timestamps
    end
  end
end
