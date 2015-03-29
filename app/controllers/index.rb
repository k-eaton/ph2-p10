require 'httparty'

get '/' do
  # Look in app/views/index.erb
  erb :index
end



post '/new_search' do
  p params
  p @new_search = params[:search_term].split(' ').join("+")
  response = HTTParty.get('https://archive.org/advancedsearch.php?q=title%3A'+@new_search +'+collection%3A+prelinger+downloads%3A%5B1000+TO+100000000%5D&fl%5B%5D=avg_rating&fl%5B%5D=description&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
  p response['response']['docs']
  if response['response']['docs'] == []
    p "no video"
  else
  response['response']['docs'][0]['description']

  @identifier = response['response']['docs'][0]['identifier']
  content_type :json
  {identifier: @identifier}.to_json
  end
end

get '/video' do


end
