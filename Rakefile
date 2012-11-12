require "execjs"
require "json"
require "net/http"
require "open-uri"
require "tempfile"

desc "Builds the project."
task :build do
  system 'rakep build'
end

desc "Fires up Thin."
task :server do
  system 'thin -R config.ru start'
end

desc "Publishes contents of ./public to gh-pages."
task :publish do
  system 'thor app:publish'
end