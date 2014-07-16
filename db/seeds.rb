# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(email: 'admin@admin.com', password: '123456789', password_confirmation: '123456789')

#Populate currencies
Currency.create!([
                     {code: 'EUR', name: "Euro"},
                     {code: 'USD', name: "US dollar"},
                     {code: 'UAH', name: "UA grivna"}
                 ])

#Populate categories
Category.create!([
                     {user_id: 1, name: 'Квартира'},
                     {user_id: 1, name: 'Харчування'},
                     {user_id: 1, name: 'Транспорт'},
                     {user_id: 1, name: 'Інтернет'},
                     {user_id: 1, name: 'Мобільний звязок'},
                     {user_id: 1, name: 'Одежа'},
                     {user_id: 1, name: 'Медикаменти'},
                     {user_id: 1, name: 'Покупка техніки'},
                     {user_id: 1, name: 'Відпочнок і подорожі'},
                     {user_id: 1, name: 'Подарунки і дні народження'},
                     {user_id: 1, name: 'Автомобіль'},
                     {user_id: 1, name: 'Інше'}
                 ])