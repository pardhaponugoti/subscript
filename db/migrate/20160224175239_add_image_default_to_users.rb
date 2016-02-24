class AddImageDefaultToUsers < ActiveRecord::Migration
  def change
    change_column :users, :image, :string, null: false, default: "http://www.clipartbest.com/cliparts/McL/G6G/McLG6G9ki.png"

    change_column_default(:users, :first_name, nil)
    change_column_default(:users, :last_name, nil)
  end
end
