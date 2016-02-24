Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: 'json'} do
    resources :users, only: [:create, :index, :update]
    resource :session, only: [:new, :create, :destroy]
    resources :reviews, only: [:index, :create, :update]
    resources :subscriptions, only: [:index, :create, :update]
  end
end
