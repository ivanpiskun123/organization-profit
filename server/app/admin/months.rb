ActiveAdmin.register Month do


  permit_params :date, :sales_plan

  # controller do
  #   def scoped_collection
  #     Month.includes(purchases: :consumable, sales: :product)
  #   end
  # end

  preserve_default_filters!
  filter :sales, collection: -> { Sale.includes(:month, :product) }
  filter :purchases, collection: -> { Purchase.includes(:month, :consumable) }

  form do |f|
    f.inputs do
      f.input :date, label: "Учетный месяц (день опционален)"
      f.input :sales_plan
    end
    f.actions
  end

  # show title: proc { "Учетный месяц" } do
  #
  #
  # end

end
