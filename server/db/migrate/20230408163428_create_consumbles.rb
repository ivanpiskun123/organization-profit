class CreateConsumbles < ActiveRecord::Migration[7.0]
  def change
    create_table :consumables do |t|
      t.string "name", default: "", null: false
      t.integer "price", default: 0, null: false

      t.timestamps
    end
  end
end
