class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :balance_states
  has_many :categories
  has_many :transactions
  has_one :setting
  has_many :sums

  accepts_nested_attributes_for :balance_states
  accepts_nested_attributes_for :categories
  accepts_nested_attributes_for :transactions
  accepts_nested_attributes_for :setting
end
