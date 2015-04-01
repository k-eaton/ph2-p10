class User < ActiveRecord::Base
  has_many :ratings, through: :videos
  has_many :wtfs, through: :videos
  has_many :reviews, through: :videos
  has_many :videos, through: :library
end
