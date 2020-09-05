class Cat < ApplicationRecord
  validates :name, :breed, uniqueness: true, presence: true
  validates :gender, presence: true
  has_one_attached :photo
end
