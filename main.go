package main

import (
	"github.com/gin-gonic/gin"
	middleware "github.com/messysoup/react-go-bookquotes/Middleware"
)

func main() {
	router := gin.Default()

	middleware.Initialize_metadata()

	router.GET("/book/title/:title", middleware.Get_by_book_title)
	router.GET("/book/id/:id", middleware.Get_book_by_id)
	router.GET("/book/number_of_books", middleware.Get_number_of_books)
	router.GET("/book/all_book_metadata", middleware.Get_All_Metadata)
	router.GET("/book/title_search/:title_search", middleware.Get_title_search)
	router.GET("/book/title_search/blank_search", middleware.Blank_search)

	router.Run("localhost:8080")
}
