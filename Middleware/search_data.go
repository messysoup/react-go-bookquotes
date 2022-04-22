package middleware

import (
	"strings"

	"github.com/messysoup/react-go-bookquotes/models"
)

func Search_book_titles(title_search string) models.Books {
	var results models.Books

	for _, v := range book_metadata.Books {

		lowered_title := strings.ToLower(v.Title)

		if strings.HasPrefix(lowered_title, title_search) {
			book, _ := Get_book_file(v.Title, "title")
			results.Books = append(results.Books, book)
		}
	}

	return results
}
