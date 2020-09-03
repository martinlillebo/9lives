# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cat.create(name: "Cookie", gender: "female", breed: "Russian Blue", allergies: "true", mood: "happy", available: "false")
Cat.create(name: 'Rusty', gender: 'male', breed: 'Turkish Angora', allergies: 'false', mood: 'chill', available: 'false')

User.create(username: CatLover, email: test@test.com)

