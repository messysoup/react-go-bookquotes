package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/messysoup/react-go-bookquotes/helpers"
	"github.com/messysoup/react-go-bookquotes/models"
)

var book_metadata models.Books

func Initialize_metadata() {
	book_metadata = helpers.Get_books_metadata()

}

func Get_by_book_title(c *gin.Context) {
	title := c.Param("title")

	quote, err := get_book_file(title, "title")

	send_request(quote, err, c)
}

func Get_book_by_id(c *gin.Context) {
	id := c.Param("id")

	quote, err := get_book_file(id, "id")

	send_request(quote, err, c)

}

func Get_number_of_books(c *gin.Context) {
	var num_of_books models.Number_of_Books

	num_of_books.BookCount = len(book_metadata.Books)

	c.IndentedJSON(http.StatusOK, num_of_books)

}

func Get_All_Metadata(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, book_metadata)
}

func send_request(quote models.Book_data, err error, c *gin.Context) {
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, quote)
}
