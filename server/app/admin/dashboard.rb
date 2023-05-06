# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do

    columns do

      column do
        panel "Административня страница" do
          para "Добро пожаловать! Для работы с данными используйте расположенную выше панель моделей базы данных программного средства мониторинга и анализа прибыли организации."
        end
      end
    end
  end

end
