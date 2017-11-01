#  Charity Choice API

## About:
Charity-tracker. Ability to find charities, save one or more charities to Favorites, delete a Favorite from one's Favorites list, look at other people’s Favorites lists and share one’s own Favorites. User might want to, say, gift her parents a donation to a charity of the type they like donating to for a holiday gift. She wants to easily view charities she has donated to both on behalf of other people and just because she wants to give support to some good causes.

## Group Members:

 [Stuart Kershaw](https://github.com/stuartkershaw)  
 [Mark Hangarter](https://github.com/Mackoyokcam)  
 [Ron Barrantes](https://github.com/ronbarrantes)  
 [Katherine Hanson](https://github.com/KatherineHanson)  
 [Christina Thomas](https://github.com/Penssake)  

## Routes:

### `/auth`
**Basic Auth**
##### GET: returns tokenseed
##### POST: `username` (required, unique), `email` (required, unique), `password` (required)
##### PUT: `username` (required, unique), `email` (required, unique), `password` (required)

* * *

### `/profiles`
**Bearer Auth**
##### GET: returns an array of paginated profile objects
##### POST: `firstName` (required), `lastName` (required), `city`, `state`, `donationGoal`, `moneySpent`, `bio`

### `/profiles?`
##### GET: returns an array of profile objects with fuzzy search parameters: `firstName`, `lastName`, `city`, `state`

### `/profiles/:id`
##### GET: returns profile object as JSON
##### PUT: expects JSON

### `/profiles/avatar`
##### PUT: expects image

* * *

### `/charities`
**Bearer Auth**
##### GET: returns an array of paginated profile objects

### `/charities?`
##### GET: returns an array of profile objects with fuzzy search parameters: `name`, `city`, `state`, `state`, `cause`, `category`

### `/charities/:id`
##### GET: returns charity object as JSON
##### PUT: expects JSON

* * *

### `/favorites`
**Bearer Auth**
##### GET: returns an array of paginated favorite objects
##### POST: `charityId` (required)

### `/charities/:id`
##### DELETE: expects JSON

* * *

### `/donations`
**Bearer Auth**
##### GET: returns an array of paginated donation objects
##### POST: `charityId` (required), `amount` (required), `inHonorOf`

### `/donations?`
##### GET: returns an array of donation objects with fuzzy search parameter: `inHonorOf`

* * *

## Scripts:
##### `npm run dbon`
##### `npm start`

* * *

## Testing:
##### `npm test`
