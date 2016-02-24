class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.text :description, null: false

      t.timestamps null: false
    end

    add_index :subscriptions, :url, unique: true
  end
end
