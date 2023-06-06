# Social Network API
This is a social network API built with Express.js, MongoDB, and Mongoose ODM. It allows users to share their thoughts, react to friends’ thoughts, and create a friend list. The API routes are designed to handle large amounts of unstructured data.

## Models
The API includes two models: User and Thought. The User model includes fields for username, email, thoughts, and friends. The Thought model includes fields for thoughtText, createdAt, username, and reactions.

## API Routes
The API includes routes for users and thoughts. The `/api/users` route allows users to GET all users, GET a single user by its `_id`, POST a new user, PUT to update a user by its `_id`, and DELETE to remove a user by its `_id`. The `/api/users/:userId/friends/:friendId` route allows users to POST to add a new friend to a user's friend list and DELETE to remove a friend from a user's friend list. The `/api/thoughts` route allows users to GET all thoughts, GET a single thought by its `_id`, POST to create a new thought, PUT to update a thought by its `_id`, and DELETE to remove a thought by its `_id`. The `/api/thoughts/:thoughtId/reactions` route allows users to POST to create a reaction stored in a single thought's `reactions` array field and DELETE to pull and remove a reaction by the reaction's `reactionId` value.

## Getting Started
To get started, clone the repository and install the dependencies.

git clone https://github.com/username/social-network-api.git
cd social-network-api
npm install

Next, create a MongoDB database and update the `config/keys.js` file with your MongoDB URI.

Finally, start the server.

npm start


The server will be running on port 5000. You can test the API routes using a tool such as Insomnia.