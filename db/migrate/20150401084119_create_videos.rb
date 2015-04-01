class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :identifier
      t.references :ratings
      t.references :users
      t.references :wtf
      t.references :reviews

      t.timestamp
    end
  end
end
