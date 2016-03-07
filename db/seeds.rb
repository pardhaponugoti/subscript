user_list = [
  ["Master", "Yoda", "yoda@jedi.com", "password1", "Dagobah", "http://res.cloudinary.com/pardha/image/upload/v1456508772/uizx7rpwjutkp8aechxk.jpg"],
  ["Darth", "Vader", "darthvader@darkside.com", "password1", "Tatooine", "http://res.cloudinary.com/pardha/image/upload/v1457025484/tusl4huw8mcwwckraz1y.jpg"],
  ["R2", "D2", "beepboop@droid.com", "password1", "Naboo", "http://res.cloudinary.com/pardha/image/upload/v1456886725/v5aflinrywm9pkrmayw3.jpg"],
  ["Boba", "Fett", "bobafett@bountyhuntersanonymous.com", "password1", "Kamino", "http://res.cloudinary.com/pardha/image/upload/v1456507629/bp4dkfghaibo0mvcbqnl.jpg"],
  ["Admiral", "Ackbar", "itsatrap@itsatrap.com", "password1", "Mon Cala", "http://res.cloudinary.com/pardha/image/upload/v1456367336/qfuxbnkhb1vo7n6bki3s.jpg"],
  ["Luke", "Skywalker", "luke@jedi.com", "password1", "Tatooine", "http://res.cloudinary.com/pardha/image/upload/v1456886541/n7uzyyiqgrmsvgca0d3n.jpg"],
  ["Mace", "Windu", "mace@jedi.com", "password1", "Haruun Kal", "http://res.cloudinary.com/pardha/image/upload/v1456509202/ffn0ap6efeqixtxtikiq.jpg"],
  ["Obi-Wan", "Kenobe", "obi-wan@jedi.com", "password1", "Stewjon", "http://res.cloudinary.com/pardha/image/upload/v1456508702/lie6apunrdvmbvtcc7l3.jpg"],
  ["Han", "Solo", "hansolo@bountyhuntersanonymous.com", "password1", "Corellia", "http://res.cloudinary.com/pardha/image/upload/v1456508597/jn55biofw9yrhgswlpz6.jpg"],
  ["Chew", "Bacca", "chewie@wookie.com", "password1", "Kashyyyk", "http://res.cloudinary.com/pardha/image/upload/v1456886818/j0qw6vpdcu1dz9603bkk.jpg"],
  ["Emperor", "Palpatine", "palpatine@darkside.com", "password1", "Naboo", "http://res.cloudinary.com/pardha/image/upload/v1456886924/pscegfat74sfs4xja9k8.jpg"],
  ["Count", "Dooku", "dooku@darkside.com", "password1", "Serenno", "http://res.cloudinary.com/pardha/image/upload/v1456887024/edshlhypx4dez11qmivc.jpg"],
  ["Kylo", "Ren", "kylo@darkside.com", "password1", "Corellia", "http://res.cloudinary.com/pardha/image/upload/v1456887105/nhh2a8wwgdqt0mo7ol9i.jpg"],
  ["Rey", "Skywalker?", "rey@awesome.com", "password1", "Jakku", "http://res.cloudinary.com/pardha/image/upload/v1456887193/zsrfasbzbo09ejooa3ei.jpg"]
]

user_list.each do |first_name, last_name, email, password, location, image|
  User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    location: location,
    image: image
    })
end

100.times do
  User.create({
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: "password1",
    location: Faker::Address.city
  })
end

# name, url, description, logo
subscription_list = [
  ["Uber",
    "www.uber.com",
    "Uber is an American multinational online taxi dispatch company headquartered in San Francisco, California. It develops, markets and operates the Uber mobile app, which allows consumers with smartphones to submit a trip request which is then routed to Uber drivers who use their own cars.",
    "https://recodetech.files.wordpress.com/2016/02/20160202-uber-new-logo.jpg?quality=80&strip=info&w=256&h=256&crop=1"],

  ["Lyft",
   "www.lyft.com",
   "Lyft is a privately held American transportation network company (TNC) based in San Francisco, CA. Launched in June 2012 by Logan Green and John Zimmer, the company's mobile-phone application facilitates peer-to-peer ridesharing by connecting passengers who need a ride with drivers who have a car.",
   "https://s3-media1.fl.yelpcdn.com/bphoto/lss8dMcgrbQe4glPVxPs5A/o.jpg"],

  ["Netflix",
    "www.netflix.com",
    "Netflix is a global provider of streaming movies and TV series, and now has over 75 million subscribers. Netflix started as an American DVD-by-mail service in 1998, and began streaming in 2007. Netflix expanded with streaming to Canada in 2010 and now serves over 190 countries with streaming.",
    "http://phandroid.s3.amazonaws.com/wp-content/uploads/2011/07/NetflixSquare.png"],

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
   "Welcome to the best way to shop for beauty and grooming products. Get monthly deliveries of deluxe beauty, grooming, and lifestyle samples, tailored to your profile. Try cult brands, up-and-coming lines, and everything in between.",
   "https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12640236_10153483267881647_5793089702169222015_o.jpg"],

   ["Bespoke Post",
    "www.bespokepost.com",
    "Access limited-edition boxes, exclusive pricing on unique goods, and the stories behind them all.",
    "http://static1.squarespace.com/static/5472ae54e4b0da93b2a45288/54875c94e4b04c0d3a1cd60c/54875df9e4b04c0d3a1d3359/1428451813024/?format=1000w"],

   ["Spotify",
    "www.spotify.com",
    "Spotify is a digital music service that gives you access to millions of songs.",
    "https://image.freepik.com/free-icon/spotify-logo_318-27558.jpg"],

   ["Apple Music",
    "www.apple.com/music",
    "Apple Music is a music streaming service developed by Apple Inc. Users select music to stream to their device on demand.",
    "https://www.seeklogo.net/wp-content/uploads/2015/07/Apple-Music-logo.png"],

   ["Tidal",
    "www.tidal.com",
    "Tidal is a subscription-based music streaming service that combines lossless audio and high definition music videos with curated editorial.",
    "https://superrepo.org/static/images/icons/original/xplugin.audio.wimp.png.pagespeed.ic.hYxS9FHmpF.png"],

   ["The New Yorker",
    "www.newyorker.com",
    "The New Yorker is an American magazine of reportage, commentary, criticism, essays, fiction, satire, cartoons, and poetry.",
    "https://pbs.twimg.com/profile_images/421413599441981441/GMZ5UIRl_400x400.jpeg"],

    ["Seamless",
     "www.seamless.com",
     "Seamless is an online food ordering service that allows users to order food for delivery and takeout from restaurants through their web site or suite of mobile apps.",
     "http://siliconangle.com/files/2012/02/seamless-logo.png"],

    ["Caviar",
     "www.trycaviar.com",
     "Order food from your favorite restaurants and have it delivered to your doorstep! Fast delivery with real-time GPS tracking!",
     "https://lh3.googleusercontent.com/iDxpSf9chsQCXYMmxxyexkjMjgMcw-w8FUwnO_Uv97ye-tGPtSetQjUWOeaMJ-lZZEo=w300"]

]


subscription_list.each do |name, url, description, logo|
  Subscription.create({
    name: name,
    url: url,
    description: description,
    logo: logo
    })
end

bimodal = [1, 1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5, 5]
uniform = [1, 2, 3, 4, 5]
exponential = [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5]
normal = [1, 2, 2, 3, 3, 3, 3, 4, 4, 5]
logarithmic = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5]

100.times do |i|
  13.times do |j|
    if j == 0
      rating = bimodal.sample
      if rating == 1
        frequency = logarithmic.sample
      elsif rating == 2
        frequency = logarithmic.sample
      elsif rating == 3
        frequency = uniform.sample
      elsif rating == 4
        frequency = exponential.sample
      elsif rating == 5
        frequency = exponential.sample
      end
    elsif j == 1
      rating = uniform.sample
      frequency = uniform.sample
    elsif j == 2
      rating = exponential.sample
      if rating == 1
        frequency = logarithmic.sample
      elsif rating == 2
        frequency = logarithmic.sample
      elsif rating == 3
        frequency = uniform.sample
      elsif rating == 4
        frequency = exponential.sample
      elsif rating == 5
        frequency = exponential.sample
      end
    elsif j == 3
      rating = normal.sample
      frequency = logarithmic.sample
    elsif j == 4
      rating = exponential.sample
      if rating == 1
        frequency = logarithmic.sample
      elsif rating == 2
        frequency = logarithmic.sample
      elsif rating == 3
        frequency = uniform.sample
      elsif rating == 4
        frequency = exponential.sample
      elsif rating == 5
        frequency = exponential.sample
      end
    elsif j == 5
      rating = normal.sample
      frequency = uniform.sample
    elsif j == 7
      rating = exponential.sample
      frequency = bimodal.sample
    elsif j == 8
      rating = logarithmic.sample
      frequency = logarithmic.sample
    elsif j == 9
      rating = logarithmic.sample
      frequency = logarithmic.sample
    else
      rating = normal.sample
      frequency = normal.sample
    end

    Review.create({
      author_id: i+15,
      subscription_id: j+1,
      rating: rating,
      frequency: frequency
    })
  end
end

Review.create({
  author_id: 1,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "Useful, Uber is."
})

Review.create({
  author_id: 2,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "I find their lack of LyftSpaceships... disturbing."
})
Review.create({
  author_id: 1,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "A wise choice, Lyft is."
})



Review.create({
  author_id: 1,
  subscription_id: 8,
  rating: 5,
  frequency: 5,
  comment: "A good source of music, Spotify is."
})
Review.create({
  author_id: 2,
  subscription_id: 10,
  rating: 5,
  frequency: 5,
  comment: "Great color scheme."
})

Review.create({
  author_id: 3,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "beep beep."
})
Review.create({
  author_id: 3,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "beep boop beep."
})
Review.create({
  author_id: 3,
  subscription_id: 3,
  rating: 5,
  frequency: 5,
  comment: "beep beep beep boop beep."
})

Review.create({
  author_id: 3,
  subscription_id: 9,
  rating: 5,
  frequency: 5,
  comment: "beep boop boop beep."
})
Review.create({
  author_id: 3,
  subscription_id: 11,
  rating: 5,
  frequency: 5,
  comment: "boop beep."
})

Review.create({
  author_id: 5,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "Uber.. it's a trap!"
})
Review.create({
  author_id: 5,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "Lyft.. it's a trap!"
})
Review.create({
  author_id: 5,
  subscription_id: 3,
  rating: 5,
  frequency: 5,
  comment: "Netflix.. it's a trap!"
})



Review.create({
  author_id: 10,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "Rawwrrrrrrr!"
})
Review.create({
  author_id: 10,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "Aaaaaaaaaaaaaaaarrrgh!"
})

Review.create({
  author_id: 10,
  subscription_id: 11,
  rating: 5,
  frequency: 5,
  comment: "Aaaaaaaaaaaaaaaarrrgh!"
})
Review.create({
  author_id: 10,
  subscription_id: 9,
  rating: 5,
  frequency: 5,
  comment: "Aaaaaaaarrrgh!!"
})


Review.create({
  author_id: 9,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "Could be useful for smuggling"
})
Review.create({
  author_id: 9,
  subscription_id: 5,
  rating: 5,
  frequency: 5,
  comment: "So they deliver stuff for you?  Seems like a good deal."
})

Review.create({
  author_id: 8,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "A useful tool, but should be used with caution."
})
Review.create({
  author_id: 8,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "A useful ride sharing service, however one must wield it cautiously."
})


Review.create({
  author_id: 11,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "A useful tool.. for the dark side."
})

Review.create({
  author_id: 11,
  subscription_id: 5,
  rating: 5,
  frequency: 5,
  comment: "Amazon prime would be a great addition to the dark side."
})









Review.create({
  author_id: 10,
  subscription_id: 3,
  rating: 5,
  frequency: 5,
  comment: "Arrrrrrrrrrrrrgh!"
})


Review.create({
  author_id: 8,
  subscription_id: 5,
  rating: 5,
  frequency: 5,
  comment: "Amazon prime is a convenient service, however it must be used with caution."
})
Review.create({
  author_id: 1,
  subscription_id: 5,
  rating: 5,
  frequency: 5,
  comment: "Convenient, Amazon Prime is."
})

Review.create({
  author_id: 5,
  subscription_id: 11,
  rating: 5,
  frequency: 5,
  comment: "Pretty sure this one's a trap!"
})

Review.create({
  author_id: 9,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "Could be useful for smuggling"
})
Review.create({
  author_id: 2,
  subscription_id: 5,
  rating: 5,
  frequency: 5,
  comment: "I like their use of drones."
})
Review.create({
  author_id: 5,
  subscription_id: 9,
  rating: 1,
  frequency: 1,
  comment: "Not completely sure, but I have a feeling Apple Music is a trap!"
})
Review.create({
  author_id: 3,
  subscription_id: 6,
  rating: 5,
  frequency: 5,
  comment: "beep boop beep boop."
})
Review.create({
  author_id: 11,
  subscription_id: 2,
  rating: 5,
  frequency: 5,
  comment: "Perhaps they should come over to the dark side."
})
Review.create({
  author_id: 1,
  subscription_id: 3,
  rating: 5,
  frequency: 5,
  comment: "Entertaining, Netflix is. However, with moderation, one must use it."
})

Review.create({
  author_id: 2,
  subscription_id: 1,
  rating: 5,
  frequency: 5,
  comment: "I find their lack of UberSpaceships... disturbing."
})
