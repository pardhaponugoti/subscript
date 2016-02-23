Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resources :session, only: [:new, :create, :destroy]
  root to: "static_pages#root"
end
