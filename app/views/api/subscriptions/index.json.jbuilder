json.array! @subscriptions do |subscription|
  json.partial! 'api/subscriptions/subscription', locals: {subscription: subscription}
end
