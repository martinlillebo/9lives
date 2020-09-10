class Cat < ApplicationRecord
  validates :name, :breed, uniqueness: true, presence: true
  validates :gender, presence: true
  has_one_attached :photo
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end


