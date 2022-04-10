package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/messysoup/react-go-bookquotes/models"
)

var book_metadata models.Books

func get_books_metadata() {

	wd, _ := os.Getwd()

	filepath_cleaned := filepath.Join(wd, "Assets", "books.json")

	book_metadata_raw, book_metadata_err_raw := os.ReadFile(filepath_cleaned)

	if book_metadata_err_raw != nil {
		fmt.Println(book_metadata_err_raw)
	}

	json.Unmarshal(book_metadata_raw, &book_metadata)

	fmt.Println("read metadata")

}
