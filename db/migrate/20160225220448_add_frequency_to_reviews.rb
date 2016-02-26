class AddFrequencyToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :frequency, :integer
    change_column :reviews, :rating, :float
  end
end
