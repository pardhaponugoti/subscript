# subscript

## Minimum Viable Product

My project is a website where you can rate the subscriptions and services that
you pay for, and also see your friends' subscriptions.

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account
- [x] Log in / Log out
- [x] Create a profile
- [x] Add reviews of subscriptions
- [x] Also see global reviews of the services

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Users Model and User Profile Creation (1.5 days)

**Objective:** Users can create profile

- [x] seed the database with a small amount of test data
- [x] CRUD API for users
- [x] jBuilder views for users
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.
- [x] setup the flux loop with skeleton files
- [x] setup React Router

### Phase 3: Start Styling (1 days)

**Objective:** Existing pages (including signup/signin) will look good.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 4: Subscriptions (0.5 days)

**Objective:** Subscriptions will have their own page

- [x] create `Subscription` model
- [x] add flux model for Subscriptions
- [x] Subscription page should be styled and ready for reviews

### Phase 5: Reviews (0.5 days)

**Objective:** Users can create reviews and they appear on their profile

- [x] create `Review` model
- [x] CRUD for Reviews
- [x] add flux model for Reviews
- [x] reviews will now show up on user profile and on subscription profile page

### Phase 6: Search (1.5 days)

**objective:** Add a search functionality to the nav bar where users can search
for subscriptions or their friends

- [x] auto-populates suggestions based on what the user has typed in so far
- [x] when user clicks on an element it redirects to the page

### Phase 7: Styling Cleanup and Seeding (2 days)

**objective:** Make the site feel more cohesive and awesome.

- [x] Error handling
- [x] Get feedback on my UI from others
- [x] Refactor HTML classes & CSS rules
- [x] Add modals, transitions, and other styling flourishes.

### Random Todos

**objective** Make site better for production

- [ ] add a backend query to subscriptionSearch

### Bonus Features (TBD)
- [ ] Add upvote model to reviews
- [x] Add charts to show patterns for the ratings
- [x] Add infinite scroll
- [ ] Add multiple session capability
- [ ] Add Facebook integration to validate friends
- [ ] Add capability for other users to post and it shows up on your feed
