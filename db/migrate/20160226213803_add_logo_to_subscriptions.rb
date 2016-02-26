class AddLogoToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :logo, :string
  end
end
