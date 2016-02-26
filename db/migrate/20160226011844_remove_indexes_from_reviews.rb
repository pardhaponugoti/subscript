class RemoveIndexesFromReviews < ActiveRecord::Migration
  def change
    remove_index :reviews, name: "index_reviews_on_author_id"
    remove_index :reviews, name: "index_reviews_on_subscription_id"
  end
end
