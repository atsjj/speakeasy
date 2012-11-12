class App < Thor
  include Thor::Actions
  
  desc "setup_publish", "setup_publish", :hide => true
  method_options :force => :boolean
  def setup_publish
    empty_directory ".public"
    directory ".git", ".public/.git", :recursive => true
    inside(".public") do
      run("git checkout gh-pages")
      run("git pull origin gh-pages")
    end
  end
  
  desc "copy_files_to_publish", "copy_files_to_publish", :hide => true
  method_options :force => :boolean
  def copy_files_to_publish
    directory "public", ".public", :recursive => true
  end
  
  desc "add_and_commit_publish", "add_and_commit_publish", :hide => true
  method_options :force => :boolean
  def add_and_commit_publish
    inside(".public") do
      run("git commit -am \"Generated publish.\"")
      run("git push origin gh-pages")
    end
  end
  
  desc "clean_up", "clean_up", :hide => true
  method_options :force => :boolean
  def clean_up
    remove_dir ".public"
  end
  
  desc "publish", "Creates a hidden directory .public and publishes it to your gh-pages branch."
  method_options :force => :boolean
  def publish
    Thor::Sandbox::App.source_root File.dirname(__FILE__)
    invoke :setup_publish
    invoke :copy_files_to_publish
    invoke :add_and_commit_publish
    invoke :clean_up
  end
end