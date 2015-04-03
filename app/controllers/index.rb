require 'httparty'


get '/' do
  # Look in app/views/index.erb
  erb :index
end



post '/new_search' do
  p @new_search = params[:search_term].split(' ').join("+")
  # response = HTTParty.get('http://archive.org/advancedsearch.php?q=title%3A%22'+ @new_search +'%22+collection%3A+prelinger+downloads%3A%5B1000+TO+100000000%5D&fl%5B%5D=avg_rating&fl%5B%5D=description&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=titleSorter+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
  # if response['response']['docs'] == []
    response = HTTParty.get('http://archive.org/advancedsearch.php?q='+ @new_search +'+collection%3A+prelinger+downloads%3A%5B10000+TO+100000000%5D+num_reviews%3A%5B10+TO+1000%5D&fl%5B%5D=avg_rating&fl%5B%5D=description&fl%5B%5D=identifier&fl%5B%5D=num_reviews&fl%5B%5D=subject&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=downloads+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json')
  # response['response']['docs'].each do |film|
    # p "I'm running"
    @docs = response['response']['docs']
    # p film
    # @match = false
    # @description = response['response']['docs'][film]['description']
    # @subject = response['response']['docs'][film]['subject']
    # @identifier = response['response']['docs'][film]['identifier']
    # @num_reviews = response['response']['docs'][film]['num_reviews']
    # @avg_rating = response['response']['docs'][film]['avg_rating']
    # @title = response['response']['docs'][film]['title']
    content_type :json
    {film: @docs}.to_json
    # {match: @match, title: @title, identifier: @identifier, description: @description, subject: @subject, num_reviews: @num_reviews, avg_rating: @avg_rating}.to_json
  # end
  # else
  #   @match = true
  #   @description = response['response']['docs'][0]['description']
  #   @subject = response['response']['docs'][0]['subject']
  #   @identifier = response['response']['docs'][0]['identifier']
  #   @num_reviews = response['response']['docs'][0]['num_reviews']
  #   @avg_rating = response['response']['docs'][0]['avg_rating']
  #   @title = response['response']['docs'][0]['title']
  #   content_type :json
  #   {match: @match, title: @title, identifier: @identifier, description: @description, subject: @subject, num_reviews: @num_reviews, avg_rating: @avg_rating}.to_json
  # end
end

post '/video' do
  p @wtf_data = params[:wtf_value].to_i
  p @rating = params[:star_value].to_i
  p @identifier = params[:identifier]
  p @new_record = Rating.new(identifier: @identifier, wtfrating: @wtf_data)
  if @wtf_data != 0
    @new_record.update_attributes(wtfrating: @wtf_data)
  end
  if @rating != 0
    @new_record.update_attributes(rating: @rating)
  end

end

get '/video/rating' do
  @identifier = params[:identifier]
  @avg_rating_array = Rating.where(identifier: @identifier)
  i = 0
  sum = 0
  @avg_rating_array.each do |rating|
    if rating.rating == nil
      rating.rating = 0
    end
    if rating.rating != 0
      sum += rating.rating
      i += 1
    end
  end
  if i != 0
    @avg_rating = (sum/i.to_f).round(2)
  else
    @avg_rating = "This film hasn't been rated yet"
  end
  content_type :json
  {avg_rating: @avg_rating}.to_json
end

get '/video/wtfrating' do
  @identifier = params[:identifier]
  @avg_wtf_rating_array = Rating.where(identifier: @identifier)
  i = 0
  sum = 0
  @avg_wtf_rating_array.each do |rating|
    if rating.wtfrating == nil
      rating.wtfrating = 0
    end
    if rating.wtfrating != 0
      sum += rating.wtfrating
      i += 1
    end
  end
  if i != 0
    @avg_wtf_rating = (sum/i.to_f).round(2)
  else
    @avg_wtf_rating = "This film hasn't been rated yet"
  end
  content_type :json
  {avg_wtf_rating: @avg_wtf_rating}.to_json
end




