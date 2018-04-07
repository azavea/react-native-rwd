task default: %w[build]

desc "Install npm dependencies"
task :build do
  puts "Checking installed exp-cli version ->"
  if !system("exp --version")
    puts "Error! Please install the expo command line tool to contine"
    puts "https://docs.expo.io/versions/latest/workflow/exp-cli"
  end

  puts "Installing dependencies ->"
  system("npm install")
end

desc "Run eslint"
task :lint do
  puts "Running eslint ->"
  system("npm run lint")
end

desc "Run expo and eslint in development"
task :server do
  puts "Running expo and eslint ->"
  system("npm start")
end

desc "Run project on iOS simulator"
task :ios do
  puts "Starting app on iOS simulator ->"
  system("exp ios")
end
