module Months
  class RussianMonths

    RUSSIAN_MONTHS = ["Январь", "Февраль","Март",
                      "Апрель", "Май", "Июнь",
                      "Июль", "Август","Сентябрь",
                      "Октябрь", "Ноябрь", "Декабрь"]

    attr_reader :month_number

    def initialize(month_number)
      @month_number = month_number
    end

    def call
      RUSSIAN_MONTHS[@month_number]
    end

  end
end
