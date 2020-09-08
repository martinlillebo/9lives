class ChangeAllergiesToHypoallergenic < ActiveRecord::Migration[6.0]
  def change
  rename_column :cats, :allergies, :hypoallergenic
  end
end
