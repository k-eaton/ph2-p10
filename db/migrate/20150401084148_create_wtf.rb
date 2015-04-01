class CreateWtf < ActiveRecord::Migration
  def change
    create_table :wtfs do |t|
      t.integer :wtf_rating

      t.timestamp
    end
  end
end
