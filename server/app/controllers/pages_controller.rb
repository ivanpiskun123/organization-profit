class PagesController < ApplicationController

      def home
      end

      def get_years
        render json: {
          data: {"years": Month.all.to_a.uniq{|m| m.date.year }.map{|m_uniq_year| m_uniq_year.date.year}.sort()}
        }, status: :ok
      end


       def index
         @dynamic_indexed_chart = []

         sum_sales_year = 0
         sum_plan_year = 0
         sum_prices =0
         sales_count = 0
         wholesale_sum = 0

          Month.of_specific_year(params[:year]).each do |m|
            @dynamic_indexed_chart << [m.russian_name_of_month, m.sales_sum]
            sum_sales_year += m.sales_sum
            sum_plan_year += m.sales_plan
            m.sales.each do |s|
              sales_count += 1
              sum_prices += s.product_unit_price
              wholesale_sum += s.total_sum if s.is_wholesale?
            end
          end

          @product_group_data = ProductGroup.all.map {|pg| [pg.name, pg.sales_sum_by_year(params[:year])] }

          @average_price_chart = []
          Month.of_specific_year(params[:year]).each do |m|
            @average_price_chart << [m.russian_name_of_month, m.average_sales_price]
          end

          @wholesale_percentage = (wholesale_sum.to_f*100 / sum_sales_year).round(0)
          @execution_percentage = (sum_sales_year.to_f*100 / sum_plan_year).round(0)
          @average_price = (sum_prices / sales_count).round(1)





       end

       def dynamic_plan_execution

         @dynamic_plan_chart_exec = []
         @dynamic_plan_chart_plan = []
         @dynamic_plan_data = []

         Month.of_specific_year(params[:year]).each do |m|
           @dynamic_plan_chart_exec << [m.russian_name_of_month, m.sales_sum]
           @dynamic_plan_chart_plan << [m.russian_name_of_month, m.sales_plan]
            @dynamic_plan_data << [
              m.month_number,
              m.russian_name_of_month,
              m.sales_plan,
              m.sales_sum,
              (m.plan_compl_percent*100).round(2)
            ]
         end

         render json: {
           data: {"exec": @dynamic_plan_chart_exec,
                  "plan": @dynamic_plan_chart_plan, "table": @dynamic_plan_data}
         }, status: :ok

       end

       def dynamic_plan_sales_purch
         @dynamic_plan_chart_exec = []
         @dynamic_plan_chart_plan = []
         @dynamic_plan_chart_purch = []
         @index_data = []
         @dynamic_profit = []

         Month.of_specific_year(params[:year]).each do |m|
           s = m.sales_sum
           p = m.purch_sum
           @dynamic_plan_chart_exec << [m.russian_name_of_month, s]
           @dynamic_plan_chart_plan << [m.russian_name_of_month, m.sales_plan]
           @dynamic_plan_chart_purch << [m.russian_name_of_month, p]
           @dynamic_profit << [m.russian_name_of_month, s - p]
           @index_data << [
              m.month_number,
              m.russian_name_of_month,
              s,
              p,
              s - p
            ]
         end

         render json: {
           data: {"exec": @dynamic_plan_chart_exec,
                  "plan": @dynamic_plan_chart_plan, index: @dynamic_plan_chart_purch, profit: @dynamic_profit, "table": @index_data}
         }, status: :ok


       end

       def product_group_structure
         @chart = []
         @data = []

         @chart = ProductGroup.all.map {|pg| [pg.name, pg.sales_sum_by_year(params[:year])] }
          @data = @chart

         render json: {
           data: {"groups": @data}
         }, status: :ok

       end

       def payment_method_sctructure
         @data = [ ["Наличный расчет" ,Sale.of_specific_year(params[:year]).in_cash.count], ["Эл. перевод", Sale.of_specific_year(params[:year]).in_transaction.count] ]


         render json: {
           data: {"payment_forms": @data}
         }, status: :ok
       end

       def trade_form_sctructure
         @data =   [ ["Оптовые продажи" ,Sale.of_specific_year(params[:year]).is_wholesale.count], ["Продажи в розницу", Sale.of_specific_year(params[:year]).is_retail.count] ]

         render json: {
           data: {"trade_forms": @data}
         }, status: :ok
       end

       def seasonality_sctructure
         @data = [
           ["1 квартал", get_sales_for_specific_season_and_year(params[:year], [1,3]  ).round(2)  ],
           ["2 квартал",  get_sales_for_specific_season_and_year(params[:year], [4,6]  ).round(2) ],
           ["3 квартал", get_sales_for_specific_season_and_year(params[:year], [7,9]  ).round(2)   ],
           ["4 квартал", get_sales_for_specific_season_and_year(params[:year], [10,12]  ).round(2) ]
         ]

         render json: {
           data: {"seasons": @data}
         }, status: :ok

       end


       def abs_product_analysis
         @data = abc_product_analysis(params[:year])

         render json: {
           data: {"abc": @data}
         }, status: :ok
       end

      def xyz_analysis
        @data_products = xyz_product_analysis(params[:year])
        @data_groups = xyz_groups_analysis(params[:year])
        @data_consum = xyz_consum_analysis(params[:year])

        render json: {
          data: {"xyz_prod": @data_products, "xyz_group": @data_groups, "xyz_consum": @data_consum}
        }, status: :ok
      end


      def purchases
        @chart = []
        @data = []

        @chart = Consumable.all.map {|pg| [pg.name, pg.purch_sum_by_year(params[:year])] }
        @data = @chart

        render json: {
          data: {"groups": @data}
        }, status: :ok

      end



       private

       def get_sales_for_specific_season_and_year(year, season_start_end_month_n)
           Month.where(date: ( Date.parse("1-#{season_start_end_month_n[0]}-#{year}").end_of_month .. Date.parse("1-#{season_start_end_month_n[1]}-#{year}").end_of_month )).to_a.sum(&:sales_sum)
       end



      def xyz_product_analysis(year)
        xyz_data = []
        Product.all.each do |p|
          prod_sales = []
          ms = Month.of_specific_year(year)

          ms.each do |m|
            prod_sales << m.sales.where(product_id: p.id).to_a.sum(&:total_sum)
          end

          sum_diffs = 0
          (0..(prod_sales.count-2)).each{|i| sum_diffs += ( prod_sales[i] - prod_sales[i+1] ).abs }

          average_sale = prod_sales.sum.to_f/prod_sales.count.to_f

          sigma = ((sum_diffs)/(prod_sales.count-1)).to_f/average_sale

          group = "X"
          sigma = 0 if sigma.nan?
          case sigma
          when 0.0 .. 0.99
            group = "X"
          when 1.0 .. 2.0
            group = "Y"
          else
            group = "Z"
          end

          xyz_data << [p.name, group, sigma]
        end

        xyz_data_sorted =
          begin
                xyz_data.sort do |a,b|
                  a[2] <=> b[2]
                end
          end

        xyz_data_sorted

      end

      def xyz_groups_analysis(year)
        xyz_data = []
        ProductGroup.all.each do |p|
          group_sales = []
          ms = Month.of_specific_year(year)
          prd_ids = p.products.map(&:id)
          ms.each do |m|
            group_sales << m.sales.where(product_id: prd_ids).to_a.sum(&:total_sum)
          end

          sum_diffs = 0
          (0..(group_sales.count-2)).each{|i| sum_diffs += ( group_sales[i] - group_sales[i+1] ).abs }
          average_sale = group_sales.sum.to_f/group_sales.count.to_f
          sigma = ((sum_diffs)/(group_sales.count-1)).to_f/average_sale

          group = "X"
          sigma = 0 if sigma.nan?
          case sigma
          when 0.0 .. 0.99
            group = "X"
          when 1.0 .. 2.0
            group = "Y"
          else
            group = "Z"
          end

          xyz_data << [p.name, group, sigma]
        end

        xyz_data_sorted =  xyz_data.sort { |a,b|  a[2] <=> b[2]   }
        xyz_data_sorted
      end

      def xyz_consum_analysis(year)
        xyz_data = []
        Consumable.all.each do |p|
          prod_purch = []
          ms = Month.of_specific_year(year)

          ms.each do |m|
            prod_purch << m.purchases.where(consumable_id: p.id).to_a.sum(&:total_sum)
          end

          sum_diffs = 0
          (0..(prod_purch.count-2)).each{|i| sum_diffs += ( prod_purch[i] - prod_purch[i+1] ).abs }

          average_sale = prod_purch.sum.to_f/prod_purch.count.to_f

          sigma = ((sum_diffs)/(prod_purch.count-1)).to_f/average_sale

          group = "X"
          sigma = 0 if sigma.nan?
          case sigma
          when 0.0 .. 0.99
            group = "X"
          when 1.0 .. 2.0
            group = "Y"
          else
            group = "Z"
          end

          xyz_data << [p.name, group, sigma]
        end

        xyz_data_sorted =
          begin
            xyz_data.sort do |a,b|
              a[2] <=> b[2]
            end
          end

        xyz_data_sorted

      end

       def set_current_year
         @current_year = params[:year]
       end



       def get_file_name_from_path(full_path)
          full_path.split("\\")[-1]
        end

        def run_NN_forecasting
            system("python lib/assets/python/forecast_LSTM_NN.py")
        end

      def list_years
        Month.all.to_a.uniq{|m| m.date.year }.map{|m_uniq_year| m_uniq_year.date.year}.sort()
      end

end
