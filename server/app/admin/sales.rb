ActiveAdmin.register Sale do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :amount, :payment_method, :trade_form, :month_id, :product_id, :total_sum, :user_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:amount, :payment_method, :trade_form, :month_id, :product_id, :total_sum, :user_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end




  boolean1 = { as: :select, include_blank: false, collection: {
     "Розница" => false, "Оптом" => true }} # to stay DRY
  boolean2 = { as: :select, include_blank: false, collection: {
    "Наличные" => false, "Перевод" => true }} # to stay DRY

  form do |f|
    f.inputs do
      f.input :amount
      f.input :payment_method, boolean2
      f.input :trade_form, boolean1
      f.input :month_id, as: :select, collection:  Month.all.map{|a| "#{a.id} - #{a.date.strftime("%B %d, %Y")} - план: #{a.sales_plan}" }
      f.input :product_id,  as: :select, collection:  Product.all.map{|a| "#{a.id} - #{a.product_group.name} - вид: #{a.name}" }
    end
    f.actions
  end


  controller do
    def create
        attrs = params[:sale]

        @sale = Sale.new( amount: attrs[:amount].to_i, payment_method: ActiveModel::Type::Boolean.new.cast(attrs[:payment_method]),
                          trade_form: ActiveModel::Type::Boolean.new.cast(attrs[:trade_form]), month_id: attrs[:month_id].split(" - ")[0],
                          product_id: attrs[:product_id].split(" - ")[0] )

        if @sale.save
          redirect_to '/admin/sales'
        else
          render :new
        end

    end


    def update
      attrs = params[:sale]

      @sale = Sale.find(request.fullpath.split("/")[-1]).update( amount: attrs[:amount].to_i, payment_method: ActiveModel::Type::Boolean.new.cast(attrs[:payment_method]),
                        trade_form: ActiveModel::Type::Boolean.new.cast(attrs[:trade_form]), month_id: attrs[:month_id].split(" - ")[0],
                        product_id: attrs[:product_id].split(" - ")[0]  )

      if @sale
        redirect_to '/admin/sales'
      else
        render :new
      end

    end

    private

  end


  permit_params do
    pars = [:amount, :payment_method, :trade_form, :month_id, :product_id]
    pars
  end



end
