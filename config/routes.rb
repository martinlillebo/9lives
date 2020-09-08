Rails.application.routes.draw do
  devise_for :users
  root to: 'cats#index'
  resources :cats, only: [:index, :show, :new, :create, :dashboard]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
