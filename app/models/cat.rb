class Cat < ApplicationRecord
  validates :name, :allergies, :breed, :gender, uniqueness: true, presence: true
  has_one_attached :photo
end
