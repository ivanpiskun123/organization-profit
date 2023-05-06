class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null: false, default: ""
      t.belongs_to :product_group
      t.timestamps
    end
  end
end
