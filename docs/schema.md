# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
date_of_birth   | date      | not null
location        | string    | not null
picture         | string    |
description     | text      |

## subscriptions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, unique
url             | string    | not null, unique
description     | text      | not null

## reviews
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references users), indexed
subscription_id | integer   | not null, foreign key (references subscriptions), indexed
rating          | integer   | not null
comment         | text      |
