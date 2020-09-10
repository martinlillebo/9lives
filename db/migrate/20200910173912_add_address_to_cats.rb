class AddAddressToCats < ActiveRecord::Migration[6.0]
  def change
    add_column :cats, :address, :string
  end
end
