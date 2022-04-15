package middleware

import (
	"errors"

	"github.com/messysoup/react-go-bookquotes/models"
)

var all_cached_books models.Cached_books

func get_cache(book_info models.Book_data) (models.Cached_book, error) {

	var blank_book models.Cached_book

	for _, book := range all_cached_books.Books {
		if book.Title == book_info.Title {
			return book, nil
		}
	}
	return blank_book, errors.New("book not cached")
}

func set_cache(book models.Cached_book) {
	if len(all_cached_books.Books) >= 5 {
		all_cached_books.Books = all_cached_books.Books[1:]
	}

	all_cached_books.Books = append(all_cached_books.Books, book)
}

// Transforms a cached_book struct to a book_data struct
func transform_to_book_data(cached models.Cached_book) models.Book_data {
	var result models.Book_data

	result.Author = cached.Author
	result.BookFile = cached.BookFile
	result.ID = cached.ID
	result.Quote = cached.Quote
	result.Title = cached.Title

	return result
}

func transform_to_cached_book(book models.Book_data, content string) models.Cached_book {
	var result models.Cached_book

	result.Author = book.Author
	result.BookFile = book.BookFile
	result.Content = content
	result.ID = book.ID
	result.Quote = book.Quote
	result.Title = book.Title

	return result
}
