class CreateLibrary < ActiveRecord::Migration
  def change
      create_table :libraries do |t|
      t.references :users
      t.references :videos

      t.timestamp
    end
  end
end
