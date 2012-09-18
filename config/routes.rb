Speakeasy::Application.routes.draw do
  resources :drinks

  resource :static, :only => [:index]
  
  root :to => 'static#index'
end
