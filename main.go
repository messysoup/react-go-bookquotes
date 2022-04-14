package main

import (
	"github.com/gin-gonic/gin"
	"github.com/messysoup/react-go-bookquotes/helpers"
	"github.com/messysoup/react-go-bookquotes/models"
)

var book_metadata models.Books

func main() {
	// Get the metedata of available books for lookup purposes
	book_metadata = helpers.Get_books_metadata()

	router := gin.Default()

	router.GET("/book/title/:title", get_by_book_title)
	router.GET("/book/id/:id", get_book_by_id)
	router.GET("/book/number_of_books", get_number_of_books)

	router.Run("localhost:8080")

	// content_as_sentences := split_sentences(content)

	// get_sentence(content_as_sentences, true)

}
