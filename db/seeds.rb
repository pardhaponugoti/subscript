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
    "http://phandroid.s3.amazonaws.com/wp-content/uploads/2011/07/NetflixSquare.png"
  ],

  ["Blue Apron",
   "www.blueapron.com",
   "Blue Apron makes cooking fun and easy. We'll provide you with all the ingredients that you need to make a delicious meal in exactly the right proportions.",
   "https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/11061187_1053274271382154_6465854666002142974_n.jpg?oh=77b18e2e12724c432b2ece8f20ef1291&oe=576A2251"],

  ["Amazon Prime",
   "www.amazon.com/prime",
   "In 2005, Amazon announced the creation of Amazon Prime, a membership offering free two-day shipping within the contiguous United States on all eligible purchases for a flat annual fee of $79 (equivalent to $96 in 2016), as well as discounted one-day shipping rates.",
   "http://cdn-jpg.allyou.com/sites/default/files/image/2014/01/300x300/i/2012/11/free-amazon-prime-ictcrop-m.jpg"],

  ["Birchbox",
   "www.birchbox.com",
   "Welcome to the best way to shop for beauty and grooming products.

Monthly Subscription: Get monthly deliveries of deluxe beauty, grooming, and lifestyle samples, tailored to your profile. Try cult brands, up-and-coming lines, and everything in between. www.birchbox.com/join

Birchbox Shop: Stock up on the best products, including customer favorites, exclusive launches—and of course everything in your monthly Birchboxes. www.birchbox.com/shop

Magazine: Dive into our original content, from product intel and how-to tutorials to trend stories and more. www.birchbox.com/magazine",
 "https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12640236_10153483267881647_5793089702169222015_o.jpg"]

]
