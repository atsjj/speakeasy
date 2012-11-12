require 'bundler/setup'
require 'rake-pipeline'
require 'rake-pipeline/middleware'

class ShipIt
  def initialize(app)
    @app = app
  end
  
  def call(env)
    requestFile = File.basename(env["REQUEST_PATH"])
    pipeline = Rake::Pipeline::Project.new File.join(File.dirname(__FILE__), "Assetfile")
    files = pipeline.output_files
    
    match = files.select { |k| requestFile == File.basename(k.path) }
    pipeline.invoke unless match.empty?
    
    @app.call(env)
  end
end

class NoCache
  def initialize(app)
    @app = app
  end

  def call(env)
    @app.call(env).tap do |status, headers, body|
      headers["Cache-Control"] = "no-store"
    end
  end
end

# Provides a fix for bad escaping in child directories
# https://github.com/rack/rack/commit/7c36a88f73339bebe8b91b27e47ac958a7965f4f
module Rack
  class MyDirectory < Directory
    def initialize(root, app=nil)
      super(root, app)
    end

    def list_directory
      @files = [['../','Parent Directory','','','']]
      glob = F.join(@path, '*')

      url_head = (@script_name.split('/') + @path_info.split('/')).map do |part|
        Rack::Utils.escape part
      end

      Dir[glob].sort.each do |node|
        stat = stat(node)
        next  unless stat
        basename = F.basename(node)
        ext = F.extname(node)

        url = F.join(*url_head + [Rack::Utils.escape(basename)])
        size = stat.size
        type = stat.directory? ? 'directory' : Mime.mime_type(ext)
        size = stat.directory? ? '-' : filesize_format(size)
        mtime = stat.mtime.httpdate
        url << '/'  if stat.directory?
        basename << '/'  if stat.directory?

        @files << [ url, basename, size, type, mtime ]
      end

      return [ 200, {'Content-Type'=>'text/html; charset=utf-8'}, self ]
    end
  end
end

use NoCache

map "/" do
  use ShipIt
  run Rack::MyDirectory.new 'public' 
end

map "/app" do
  run Rack::MyDirectory.new 'app'
end