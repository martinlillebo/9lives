class Cat < ApplicationRecord
  validates :name, :allergy, :breed, :gender, uniqueness: true, presence: true
  has_one_attached :photo
end
