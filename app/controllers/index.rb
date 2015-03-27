get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/add_todo' do
  @new_todo = Todo.create(todo_content: params[:todo])

  redirect '/'
end

