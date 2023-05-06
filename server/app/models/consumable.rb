class Consumable < ApplicationRecord

  validates :name, uniqueness: true, presence: true
  validates :price, presence: true

  validates :price, inclusion: { in: 0..99999999999 ,
                                 message: "(%{value}) can't be less 0 and more 99999999999" }

  has_many :purchases

  def purch_sum
    self.purchases.to_a.sum(&:total_sum)
  end

  def purch_sum_by_year(year)
    self.purchases.of_specific_year_to_array(year).to_a.sum(&:total_sum)
  end

  def to_s
    "#{self.name}"
  end
end
