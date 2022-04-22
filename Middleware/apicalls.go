package middleware

import (
	"net/http"
	"strings"

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

	quote, err := Get_book_file(title, "title")

	send_request(quote, err, c)
}

func Get_book_by_id(c *gin.Context) {
	id := c.Param("id")

	quote, err := Get_book_file(id, "id")

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

func Get_title_search(c *gin.Context) {
	search_string := strings.ToLower(c.Param("title_search"))
	results := Search_book_titles(search_string)

	c.IndentedJSON(http.StatusOK, results)
}

func Blank_search(c *gin.Context) {
	results := book_metadata

	for index, value := range results.Books {
		book, _ := Get_book_file(value.Title, "title")
		results.Books[index] = book
	}

	c.IndentedJSON(http.StatusOK, results)
}

func send_request(quote models.Book_data, err error, c *gin.Context) {
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, quote)
}
