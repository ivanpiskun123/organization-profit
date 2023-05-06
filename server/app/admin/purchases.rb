ActiveAdmin.register Purchase do


  # permit_params :amount, :month_id, :consumable

  form do |f|
    f.inputs do
      f.input :amount
      f.input :month_id, as: :select, collection:  Month.all.map{|a| "#{a.id} - #{a.date.strftime("%B %d, %Y")} - план: #{a.sales_plan}" }
      f.input :consumable_id,  as: :select, collection:  Consumable.all.map{|a| "#{a.id} - #{a.name} - цена: #{a.price}" }
    end
    f.actions
  end

  controller do
    def create
      attrs = params[:purchase]

      @purchase = Purchase.new( amount: attrs[:amount].to_i, month_id: attrs[:month_id].split(" - ")[0],
                                consumable_id: attrs[:consumable_id].split(" - ")[0])

      if @purchase.save
        redirect_to '/admin/purchases'
      else
        render :new
      end

    end


    def update
      attrs = params[:purchase]

      @purchase = Purchase.find(request.fullpath.split("/")[-1]).update(amount: attrs[:amount].to_i, month_id: attrs[:month_id].split(" - ")[0],
                                                                consumable_id: attrs[:consumable_id].split(" - ")[0]
      )

      if @purchase
        redirect_to '/admin/purchases'
      else
        render :new
      end

    end

    end

  permit_params do
    pars = [:amount,  :month_id, :product_id]
    pars
  end

end
