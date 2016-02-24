class Review < ActiveRecord::Base
  validates :author_id, :subscription_id, :rating, presence: true
  validates :subscription_id, uniqueness: { scope: :author_id }
end
