# Speer Backend Development Assessment

## Technology
This project was created with Node.js, Express, and MongoDB. I chose to use Node and Express because they are familiar to me, and I know they work well together. For my database I wanted to use MongoDB or Postgres because they were preferred in the outline. I chose MongoDB because I been meaning to try it for a while, and a RESTful API like this seemed like a good opportunity. Some notable 3rd party libraries also included were
- mongoose: For performing operations on the MongoDB databse in JavaScript
- jsonwebtoken: For token based user authentication
- bcrypt: For hashing user passwords
- express-rate-limit: For a simple per-user rate limit

## Intructions
1. This project requires Node.js, NPM, and MongoDB
2. Download the source code, and run `npm install`
3. Setup a local MongoDB Database named *speer_note_db*
4. Modify the .env file, with variables `PORT` and `DB_URL`, and set them to an open port and the URL of your MongoDB database respectively. Create a variable `SECRET_KEY` and assign it a value for use with JWT authentication. And just so it's written explicitly, the .env file would have been include in the gitignore file in a production project, and used a randomly generated value for `SECRET_KEY` rather than the basic string that's there.
5. Run `npm run start` to start the server

## API Usage
### Authentication Endpoints
The authentication endpoints are:
- `POST /api/auth/signup`: which accepts json with 2 fields in the body, `username` and `password`, and creates a user with those credentials. 
- `POST /api/auth/login`: which accepts json with 2 fields in the body, `username` and `password`, and returns a authentication token to the client if the credentials match a user in the database.

### Note Endpoints
The note endpoints are:
- `GET /api/notes`: get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: get a note by ID for the authenticated user.
- `POST /api/notes`: create a new note for the authenticated user. Accepts json with the fields `title` and `content` corresponding to the title and text of the created note.
- `PUT /api/notes/:id`: update an existing note by ID for the authenticated user. Accepts json with the fields `title` and/or `content` corresponding to the new title or text of the identified note.
- `DELETE /api/notes/:id`: delete a note by ID for the authenticated user.

### Search Endpoint
- `GET /api/search?q=:query`: search for notes based on keywords for the authenticated user.

## Notes
I did not develop with unit or implementation tests in mind. On reviewing the outline I saw the requirement for them and began to setup for them, but did not finish due to time. Additionally, it felt like implementing them after the fact wouldn't mean nearly as much as it goes against good TDD practices, and it would be difficult to design unbiased effective tests when their functions are already written. 

I also did not have time to complete the `POST /api/notes/:id/share` endpoint. I was a bit confused about the intended behaviour, so I set it aside and focused on the other endpoints first. 