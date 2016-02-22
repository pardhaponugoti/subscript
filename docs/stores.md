# Flux Stores

### UserStore

Holds all persisted user data.

##### Actions:
- `receiveAllUsers`
- `receiveSingleUser`
- `removeUser`

##### Listeners:
- `UserDetail`

##### Actions:
- `receiveFriendsOfUser`
- `receiveUserFromId`

##### Listeners:

### ReviewStore

Holds all persisted reviews.

##### Actions:
- `receiveAllReviews`
- `receiveSingleReview`
- `removeReview`

##### Listeners:
- `ReviewIndex`

##### Actions:
- `receiveReviews`

##### Listeners:

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`

### SearchSuggestionStore

Holds typeahead suggestions for search.

##### Actions:
- `receiveSearchSuggestions`

##### Listeners:
- `SearchSuggestions`
