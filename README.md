# My First API App

## Introduction

Hi there! 👋 This is my very first app that connects to an API. I’ve always been a fan of _The Lord of the Rings_, so I decided to create something fun using **The One API**. This app pulls data about books, movies, characters, and quotes from the world of Middle-earth.

I’m a beginner developer, and this project has been a great way to learn about working with APIs. I hope you enjoy exploring it as much as I enjoyed building it! 😊

## Features

Here’s what my app can do:

- Show all _The Lord of the Rings_ books and their chapters.
- List movies from _The Lord of the Rings_ and _The Hobbit_ trilogies.
- Explore characters, quotes, and more from the films.

## How It Works

I’m using **The One API**, which provides awesome data from the _The Lord of the Rings_ universe. Below are the routes my app connects to:

### API Endpoints

All routes start with:  
`https://the-one-api.dev/v2`

#### Open Access (No Authentication Required)

- **`/book`**  
  Get a list of all _The Lord of the Rings_ books.

- **`/book/{id}`**  
  Get details about a specific book (replace `{id}` with the book's ID).

- **`/book/{id}/chapter`**  
  See all chapters from a specific book.

#### Requires Authentication (API Token Needed)

- **`/movie`**  
  List all movies, including _The Lord of the Rings_ and _The Hobbit_ trilogies.

- **`/movie/{id}`**  
  Get details about a specific movie.

- **`/movie/{id}/quote`**  
  See all quotes from a specific movie (only works for _The Lord of the Rings_ trilogy).

- **`/character`**  
  List characters with information like name, gender, race, and more.

- **`/character/{id}`**  
  Get details about a specific character.

- **`/character/{id}/quote`**  
  See all quotes spoken by a specific character.

- **`/quote`**  
  Get all quotes from the movies.

- **`/quote/{id}`**  
  Get details of a specific quote.

- **`/chapter`**  
  See a list of all book chapters.

- **`/chapter/{id}`**  
  Get details about a specific book chapter.

---

### Lessons Learned

As this is my first app using an API, I learned a lot about:

- Sending API requests and handling responses.
- Working with authentication tokens.
- Structuring a project for APIs.
- It’s been an exciting journey, and I can’t wait to build more! 🚀

---

### Acknowledgements

A big thank you to The One API for making this project possible.
Special thanks to The Lord of the Rings for the endless inspiration.
License
This project is licensed under the MIT License.

---

Thanks for checking out my first API project! 🌟 If you have any suggestions or feedback, feel free to share!
