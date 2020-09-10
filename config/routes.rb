Rails.application.routes.draw do
  devise_for :users
  root to: 'cats#index'
  resources :cats, only: [:index, :show, :new, :create] do 
    resources :bookings, only: [:create]
  end
  get 'dashboard' , to: 'pages#dashboard'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
