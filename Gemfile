source 'https://rubygems.org'

ruby '2.2.3'

# IMPORTANT these ES gems are clustered together because
# load order is important
gem 'kaminari'
gem 'elasticsearch-dsl'
gem 'elasticsearch-model'
gem 'elasticsearch-rails-ha', '~> 1.0.2'

gem 'autoprefixer-rails'
gem 'active_model_serializers'
gem 'bourbon', '~> 4.2.0'
gem 'coderay'
gem 'coffee-rails', '~> 4.1.0'
gem 'email_validator'
gem 'flutie'
gem 'jquery-rails'
gem 'json-patch'
gem 'json-schema', git: 'https://github.com/pkarman/json-schema', branch: 'require_all'
gem 'neat', '~> 1.7.0'
gem 'normalize-rails', '~> 3.0.0'
gem 'pg'
gem 'puma'
gem 'pundit'
gem 'rack-canonical-host'
gem 'rack-cors'
gem 'rails', '~> 4.2.0'
gem 'redis-namespace'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq'
gem 'simple_form'
gem 'sinatra', require: nil
gem 'title'
gem 'uglifier'
gem 'redcarpet'
gem 'savon-multipart', git: 'https://github.com/jessieay/savon-multipart.git'
gem 'swagger-ui_rails', git: 'https://github.com/pkarman/swagger-ui_rails.git', branch: 'swagger-ui-2.1.4', submodules: true
gem 'us_web_design_standards', git: 'https://github.com/jessieay/us_web_design_standards_gem.git', branch: 'rails-assets-fixes'

group :development do
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'web-console'
end

group :development, :test do
  gem 'awesome_print'
  gem 'bundler-audit', require: false
  gem 'byebug'
  gem 'dotenv-rails'
  gem 'factory_girl_rails'
  gem 'pry-rails'
  gem 'rspec-rails', '~> 3.3.0'
  gem 'apivore', git: 'https://github.com/westfieldlabs/apivore.git'
end

group :test do
  gem 'poltergeist'
  gem 'database_cleaner'
  gem 'elasticsearch-extensions'
  gem 'queryparams'
  gem 'launchy'
  gem 'shoulda-matchers', require: false
  gem 'simplecov', require: false
  gem 'timecop'
  gem 'webmock'
  gem 'vcr'
end

group :staging, :production do
  gem 'rack-timeout'
  gem 'rails_12factor'
end
