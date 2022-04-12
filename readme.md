# React-Go-Bookquotes

React-Go-Bookquotes is a project written in Go and React.  The project consists of of Go on the backend, using Gin for routing, and React on the front end.

This project is under rapid development and is subject to change at any time.

## Setup
To use this project, you will need need both Go and NPM installed.

To get started on your machine:

1. Clone the repo
2. `cd` into `react-go-bookquotes`
3.Rrun `go mod tidy` - this will install the go dependencies (mostly for gin)
4. `cd` in `bookquote-frontend` and run `npm install` to install the required dependencies.
5. In one terminal, from `react-go-bookquotes` run `go run .` to start the gin server.
6. In a seperate terminal, from `bookquote-frontent` run `npm start` to start the react development server.  If all goes well, on `localhost:3000`, you should see a list of quotes similar to the below.

[current example output](docs/example_image.PNG)

## End goals

The end goal of this project is twofold:

1. Have a public API to retreive a random quote from a supported public domain book.
2. Have a website dedicated to searching for books and displaying them.
3. Be able to search on Author and title, or a randomized based on ID.



## Book Source
Books are sourced from Project Gutenberg and are stored under `Assets/Books`.  New books will be added regularly.

### Adding Books
To add new books follow the below steps:

1.  Only download public domain books.
2.  Books need to be in a `.txt` format. 
3.  Add book under `Assets/Books`, recommended filename is the title in CamelCase.
4.  Ensure an Author and Title are declared on dedicated lines near the start of the file.
5.  Once all new books are added, run `go run AddBooks/add_books.go` or `cd` into `AddBooks` and run `go run AddBooks.go`

### Removing Books
1.  Delete the book from `Assets/Books`
2.  run `go run AddBooks/add_books.go` or `cd` into `AddBooks` and run `go run AddBooks.go`