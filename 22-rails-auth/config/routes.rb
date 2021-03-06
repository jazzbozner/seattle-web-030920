Rails.application.routes.draw do
  resources :teachers
  resources :students, only: [:show, :new, :index, :create]
  root to: "students#index"

  get '/signup', to: "teachers#new", as: "signup"

  get '/login', to: "auth#new", as: "login"
  post '/login', to: "auth#create"
end