class Purchase < ApplicationRecord

  # Purchases of specified year
  scope :of_specific_year_to_array, ->(year) { all.select { |s| ( Date.parse("1-1-#{year}").beginning_of_year .. Date.parse("1-1-#{year}").end_of_year ).include?(s.month.date) } }
  scope :of_specific_year, ->(year) {  joins(:month).where( month: { date: ( Date.parse("1-1-#{year}").beginning_of_year .. Date.parse("1-1-#{year}").end_of_year ) } ) }

  belongs_to :month
  belongs_to :consumable

  validates :total_sum, presence: true
  validates :amount, presence: true

  validates :amount, inclusion: { in: 1..99999999999 ,
                                  message: "(%{value}) can't be less 1 and more 99999999999" }

  validates :total_sum, inclusion: { in: 0..99999999999 ,
                                     message: "(%{value}) can't be less 0 and more 99999999999" }

  before_save :calculate_total


  def to_s
    "#{month.date.strftime("%B %d, %Y")}-#{amount} ед.-#{consumable.name}"
  end

  private

  def calculate_total
    self.total_sum = consumable.price * amount
  end

end
