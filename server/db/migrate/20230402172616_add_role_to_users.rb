class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def change
     add_reference :users, :role
  end
end
