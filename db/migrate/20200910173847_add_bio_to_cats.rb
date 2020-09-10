class AddBioToCats < ActiveRecord::Migration[6.0]
  def change
    add_column :cats, :bio, :text
  end
end
