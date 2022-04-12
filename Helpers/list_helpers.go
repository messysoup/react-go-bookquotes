package helpers

import (
	"github.com/messysoup/react-go-bookquotes/models"
)


func File_in_Booklist(book models.Book_data, files []string) (bool, string) {
	for _, v := range files {
		if v == book.BookFile {
			return true, v
		}
	}

	return false, ""
}

func Book_in_Files(file string, books []models.Book_data) bool {	
	for _, v := range books {
		if v.BookFile == file {
			return true
		}
	}

	return false
}

func Remove(slice []models.Book_data, i int) []models.Book_data {
	return append(slice[:i], slice[i+1:]...)
}
