Speakeasy::Application.routes.draw do
  resource :static, :only => [:index]
  
  root :to => 'static#index'
end
