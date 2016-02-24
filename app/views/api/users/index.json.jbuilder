json.array! @users do |user|
  json.partial! 'api/users/user', locals: {user: user}
end
