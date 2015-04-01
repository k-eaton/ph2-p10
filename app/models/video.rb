class Video < ActiveRecord::Base
  has_many :ratings
  has_many :wtfs
  has_many :reviews
  has_many :users, through: :libraries
end
