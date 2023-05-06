ActiveAdmin.register Product do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :name, :product_group_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :product_group_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


  permit_params :name, :product_group

  form do |f|
    f.inputs do

      f.input :name
      f.input :product_group
    end
    f.actions
  end

end
