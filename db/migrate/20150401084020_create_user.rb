class CreateUser < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_name
      t.references :video

      t.timestamp
    end
  end
end
