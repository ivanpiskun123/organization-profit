class ProductGroup < ApplicationRecord

  has_many :products

  validates :name, length: {minimum: 2}
  validates :name, uniqueness: true


  def sales_sum
    self.products.to_a.sum(&:sales_sum)
  end

  def sales_sum_by_year(year)
    self.products.to_a.inject(0) { |sum, p| sum + p.sales_sum_by_year(year) }
  end

  def to_s
    name
  end


end
