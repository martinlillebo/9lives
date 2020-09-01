class CreateCats < ActiveRecord::Migration[6.0]
  def change
    create_table :cats do |t|
      t.string :name
      t.string :gender
      t.string :breed
      t.boolean :allergies
      t.integer :user_id
      t.string :mood
      t.boolean :available

      t.timestamps
    end
  end
end
