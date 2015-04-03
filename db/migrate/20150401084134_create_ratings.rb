class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :rating
      t.integer :wtfrating
      t.string :identifier

      t.timestamp
    end
  end
end
