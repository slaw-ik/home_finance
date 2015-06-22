# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Populate currencies
Currency.create!([
                     {code: 'EUR', name: "Euro"},
                     {code: 'USD', name: "US dollar"},
                     {code: 'UAH', name: "UA grivna"}
                 ])

#Populate Transaction types
TransactionType.create!([
                            {id: 1, name: 'debet'},
                            {id: 2, name: 'credit'}
                        ])

#Populate Interval types
IntervalType.create!([
                         {id: 1, name: 'Y', description: 'Year'},
                         {id: 2, name: 'M', description: 'Month'},
                         {id: 3, name: 'D', description: 'Day'}
                     ])

#Populate Sum types
SumType.create!([
                    {id: 1, name: 'D', description: 'Debet'},
                    {id: 2, name: 'C', description: 'Credit'},
                    {id: 3, name: 'B', description: 'Bucket state'}
                ])

#Populate categories
Category.create!([
                     {user_id: 1, name: 'Квартира', transaction_type_id: 1},
                     {user_id: 1, name: 'Харчування', transaction_type_id: 1},
                     {user_id: 1, name: 'Транспорт', transaction_type_id: 1},
                     {user_id: 1, name: 'Інтернет', transaction_type_id: 1},
                     {user_id: 1, name: 'Мобільний звязок', transaction_type_id: 1},
                     {user_id: 1, name: 'Одежа', transaction_type_id: 1},
                     {user_id: 1, name: 'Медикаменти', transaction_type_id: 1},
                     {user_id: 1, name: 'Покупка техніки', transaction_type_id: 1},
                     {user_id: 1, name: 'Відпочнок і подорожі', transaction_type_id: 1},
                     {user_id: 1, name: 'Подарунки і дні народження', transaction_type_id: 1},
                     {user_id: 1, name: 'Автомобіль', transaction_type_id: 1},
                     {user_id: 1, name: 'Інше', transaction_type_id: 1},
                     {user_id: 1, name: 'Навчання', transaction_type_id: 1},
                     {user_id: 1, name: 'Зарплата Мирослав', transaction_type_id: 2},
                     {user_id: 1, name: 'Зарплата Юля', transaction_type_id: 2}
                 ])

user = User.create!(email: 'admin@admin.com', password: '123456789', password_confirmation: '123456789')
Setting.create!(user: user, default_currency_id: Currency.first.id)