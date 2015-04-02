class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.decimal :rating
      t.decimal :wtfrating
      t.string :identifier

      t.timestamp
    end
  end
end
