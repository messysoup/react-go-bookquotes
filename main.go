package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// Get the metedata of available books for lookup purposes
	get_books_metadata()

	router := gin.Default()

	router.GET("/book/title/:title", get_by_book_title)
	router.GET("/book/id/:id", get_book_by_id)

	router.Run("localhost:8080")

	// content_as_sentences := split_sentences(content)

	// get_sentence(content_as_sentences, true)

}
