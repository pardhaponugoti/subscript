# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# first_name, last_name, email, password, location, date_of_birth,

user_list = [
  ["Boba", "Fett", "bobafett@bountyhuntersanonymous.com", "password1"],
  ["Darth", "Vader", "darthvader@darkside.com", "password1"],
  ["Admiral", "Ackbar", "itsatrap@itsatrap.com", "password1"],
  ["Luke", "Skywalker", "luke@jedi.com", "password1"],
  ["Mace", "Windu", "mace@jedi.com", "password1"],
  ["Master", "Yoda", "yoda@jedi.com", "password1"],
  ["Obi-Wan", "Kenobe", "obi-wan@jedi.com", "password1"],
  ["R2", "D2", "beepboop@droid.com", "password1"],
  ["Han", "Solo", "hansolo@bountyhuntersanonymous.com", "password1"],
  ["Chew", "Bacca", "chewie@wookie.com", "password1"],
  ["Emperor", "Palpatine", "palpatine@darkside.com", "password1"],
  ["Count", "Dooku", "dooku@darkside.com", "password1"],
  ["Kylo", "Ren", "kylo@darkside.com", "password1"],
  ["Rey", "Skywalker?", "rey@awesome.com", "password1"]
]

# name, url, description, logo
subscription_list = [
  ["Uber",
    "www.uber.com",
    "Uber Technologies Inc. is an American multinational online taxi dispatch company headquartered in San Francisco, California. It develops, markets and operates the Uber mobile app, which allows consumers with smartphones to submit a trip request which is then routed to Uber drivers who use their own cars. In the United States of America, Uber operates under the Transportation Network Company label. As of May 28, 2015, the service was available in 58 countries and 300 cities worldwide.",
    "https://recodetech.files.wordpress.com/2016/02/20160202-uber-new-logo.jpg?quality=80&strip=info&w=256&h=256&crop=1"],

  ["Lyft",
   "www.lyft.com",
   "Lyft is a privately held American transportation network company (TNC) based in San Francisco, CA. Launched in June 2012 by Logan Green and John Zimmer, the company's mobile-phone application facilitates peer-to-peer ridesharing by connecting passengers who need a ride with drivers who have a car. Lyft now operates in over 200 U.S. cities, including San Francisco, Los Angeles, and New York City, and is valued at $2.5 billion.",
   "https://s3-media1.fl.yelpcdn.com/bphoto/lss8dMcgrbQe4glPVxPs5A/o.jpg"
 ],

  ["Netflix",
    "www.netflix.com",
    "Netflix is a global provider of streaming movies and TV series, and now has over 75 million subscribers. Netflix started as an American DVD-by-mail service in 1998, and began streaming in 2007.[6] Netflix expanded with streaming to Canada in 2010 and now serves over 190 countries with streaming. Netflix's first big original series was House of Cards, which debuted in 2013, and Netflix now produces hundreds of hours of original programming around the world",
    "https://i.kinja-img.com/gawker-media/image/upload/fpqabe341bwut16xkmuj.png"
  ]
]
