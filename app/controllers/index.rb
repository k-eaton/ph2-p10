require 'httparty'

get '/' do
  # Look in app/views/index.erb
  erb :index
end



post '/new_search' do
  p params
  p @new_search = params[:search_term].split(' ').join("+")
  response = HTTParty.get('http://archive.org/advancedsearch.php?q=title%3A%22'+ @new_search +'%22+collection%3A+prelinger+downloads%3A%5B1000+TO+100000000%5D&fl%5B%5D=avg_rating&fl%5B%5D=description&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=titleSorter+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
  if response['response']['docs'] == []
    response = HTTParty.get('http://archive.org/advancedsearch.php?q='+ @new_search +'+collection%3A+prelinger+downloads%3A%5B1000+TO+100000000%5D&fl%5B%5D=avg_rating&fl%5B%5D=description&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=titleSorter+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
  response['response']['docs'].each do |film|
    @match = false
    @description = response['response']['docs'][film]['description']
    @subject = response['response']['docs'][film]['subject']
    @identifier = response['response']['docs'][film]['identifier']
    @num_reviews = response['response']['docs'][film]['num_reviews']
    @avg_rating = response['response']['docs'][film]['avg_rating']
    @title = response['response']['docs'][film]['title']
    content_type :json
    {match: @match, title: @title, identifier: @identifier, description: @description, subject: @subject, num_reviews: @num_reviews, avg_rating: @avg_rating}.to_json
  end
  else
    @match = true
    @description = response['response']['docs'][0]['description']
    @subject = response['response']['docs'][0]['subject']
    @identifier = response['response']['docs'][0]['identifier']
    @num_reviews = response['response']['docs'][0]['num_reviews']
    @avg_rating = response['response']['docs'][0]['avg_rating']
    @title = response['response']['docs'][0]['title']
    content_type :json
    {match: @match, title: @title, identifier: @identifier, description: @description, subject: @subject, num_reviews: @num_reviews, avg_rating: @avg_rating}.to_json
  end
end

get '/video' do


end
