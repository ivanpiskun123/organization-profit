ActiveAdmin.register Consumable do


  permit_params :name, :price

  form do |f|
    f.inputs do
      f.input :name
      f.input :price
    end
    f.actions
  end


  
end
