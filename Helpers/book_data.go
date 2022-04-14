package helpers

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/messysoup/react-go-bookquotes/models"
)

func Get_books_metadata() models.Books {

	var book_metadata models.Books
	var parent_dir string

	wd, _ := os.Getwd()

	if strings.HasSuffix(wd, "AddBooks") {
		parent_dir = filepath.Dir(wd)
	} else {
		parent_dir = wd
	}

	filepath_cleaned := filepath.Join(parent_dir, "Assets", "books.json")

	book_metadata_raw, book_metadata_err_raw := os.ReadFile(filepath_cleaned)

	if book_metadata_err_raw != nil {
		fmt.Println(book_metadata_err_raw)
		fmt.Println("Starting from scratch.  This could take some time based on the volume of books.")
	}

	json.Unmarshal(book_metadata_raw, &book_metadata)

	fmt.Println("read metadata")

	return book_metadata

}
