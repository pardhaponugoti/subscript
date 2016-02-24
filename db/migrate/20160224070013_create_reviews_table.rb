class CreateReviewsTable < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :author_id, null: false
      t.integer :subscription_id, null: false
      t.integer :rating, null: false
      t.text :comment
    end

    add_index :reviews, :author_id, unique: true
    add_index :reviews, :subscription_id, unique: true

    change_column :users, :first_name, :string, null: false, default: "Michael"
    change_column :users, :last_name, :string, null: false, default: "Park"
  end
end
