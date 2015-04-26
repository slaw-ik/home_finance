require 'rails_helper'

describe Sum do
  describe '::add' do
    it 'should create tree of sums' do
      date = Time.now
      value = 100
      Sum.delete_all

      Sum.add(value, date)

      expect(Sum.all.count).to eq 3
    end
  end
end