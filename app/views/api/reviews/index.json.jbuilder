json.array! @reviews do |review|
  json.partial! 'api/reviews/review', locals: {review: review}
end
