Rails.application.routes.draw do

  get 'home/welcome'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root "home#welcome"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  get 'pages/get-years'
  get 'pages/index'
  get 'pages/dynamic-plan-execution'
  get 'pages/dynamic-plan-sales-purch'
  get 'pages/product-group-structure'
  get 'pages/purchases'
  get 'pages/payment-method-sctructure'
  get 'pages/trade-form-sctructure'
  get 'pages/seasonality-sctructure'
  get 'pages/average-prices'
  get 'pages/abs-product-analysis'
  get 'pages/xyz_analysis'
  get 'pages/sales-forecast'


end

