class CreateProductGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :product_groups do |t|
      t.string :name, null: false, default: ""
      t.timestamps
    end
  end
end
