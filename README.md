# subscript

Welcome to [subscript](www.pardhaponugoti.com)!  

This is a site I created for you to rate your paid subscriptions and services
and to see others' reviews of services as well.

In addition to seeing others' reviews, you can also see statistics on the users'
ratings on the site. For example, you can see which services are the highest rated,
or the most used, on the statistics page.

Each service also has it's own page where you can see the breakdown of user ratings,
how often people are using the services, and a scatter plot of the ratings against
frequency of use.  You can also browse and read individual reviews for each service
under the Reviews tab.

As a Star Wars fan, I have seeded the database with sample reviews from Star Wars characters.

Enjoy!  

## Structure

The site was created with a Ruby on Rails Backend and a React.js frontend.  It uses the
flux model.

### Backend Code

The backend is designed to only handle API requests for data on users, subscriptions, and reviews.

#### Here is the schema for the site:

**users**

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
first_name      | string    | not null
last_name       | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
date_of_birth   | date      | not null
location        | string    | not null
image           | string    | not null
created_at      | datetime  | not null
updated_at      | datetime  | not null

**subscriptions**

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, unique
url             | string    | not null, unique
description     | text      | not null
logo            | string    |
created_at      | datetime  | not null
updated_at      | datetime  | not null

**reviews**

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references users), indexed
subscription_id | integer   | not null, foreign key (references subscriptions), indexed
rating          | float     | not null
frequency       | integer   | not null
comment         | text      |
created_at      | datetime  | not null
updated_at      | datetime  | not null


### Frontend Code

The frontend code is divided into the following folders:

* Actions - JS objects that invoke API requests, or dispatch messages through the Dispatcher
* Components - React components used on the site
* Constants - JS objects that hold strings used by the Dispatcher
* Stores - JS objects that store data on reviews, sessions, subscriptions, and users
* Util - JS objects that query the API controller through AJAX requests

There is also a dispatcher.js file which holds the dispatcher that communicates
with all of the stores, and an entry.jsx file that houses the React Router.
