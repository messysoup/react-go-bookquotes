package main

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"

	"github.com/messysoup/react-go-bookquotes/helpers"
	"github.com/messysoup/react-go-bookquotes/models"
)

// A script to automatically add books in `Assets/Books` not present in the current
// `books.json` metadata to the `books.json` file.  Will also cleanse the same file
// of books no longer in `Assets/Books`.
//
// This relies heavily on Project Gutenberg's default formatting where there are
// seperate and distinct lines for Authors and Titles near the start of each file.
func main() {
	metadata := helpers.Get_books_metadata()
	current_files := get_files()

	new_metadata := get_new_metadata(metadata, current_files)
	cleaned_metadata := remove_non_existent_books(new_metadata, current_files)

	updated_ids := update_ids(cleaned_metadata)

	write_file(updated_ids, "books.json")

}

func get_files() []string {

	var filenames []string

	wd, _ := os.Getwd()
	parent_dir := filepath.Dir(wd)

	path := filepath.Join(parent_dir, "Assets", "Books")

	files, _ := ioutil.ReadDir(path)

	for _, file := range files {
		filenames = append(filenames, file.Name())
	}

	return filenames

}

// Checks the current listing of books against what is currently in Assets.
// Returns a models.Books struct of all books currently in Assets.  New books
// are given an ID of -1.
// Accepts two arguements:
//
// - `metadata` The `books.json` file data.
//
// - `files` A list of strings of the existing books.
func get_new_metadata(metadata models.Books, files []string) models.Books {

	result := metadata

	for _, filename := range files {

		var book_data models.Book_data
		var author_title models.Author_title

		file_bool := helpers.Book_in_Files(filename, metadata.Books)

		if file_bool {
			continue

		} else {
			author_title = read_file(filename)

			book_data.Author = author_title.Author
			book_data.Title = author_title.Title

			book_data.BookFile = filename
			book_data.ID = "-1"
			book_data.Quote = ""
		}

		result.Books = append(result.Books, book_data)
	}

	return result
}

func remove_non_existent_books(metadata models.Books, files []string) models.Books {

	result := metadata

	for i, book := range metadata.Books {
		cont_bool, _ := helpers.File_in_Booklist(book, files)

		if !cont_bool {
			result.Books = helpers.Remove(result.Books, i)
		}
	}

	return result
}

func read_file(file_name string) models.Author_title {

	var result models.Author_title

	wd, _ := os.Getwd()
	parent_dir := filepath.Dir(wd)

	cleaned_filepath := filepath.Join(parent_dir, "Assets", "Books", file_name)

	file, _ := os.Open(cleaned_filepath)

	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		text := strings.Split(scanner.Text(), " ")

		field := strings.ToLower(text[0])

		if strings.Contains(field, "author") {
			result.Author = strings.Join(text[1:], " ")
			continue
		}
		if strings.Contains(field, "title") {
			result.Title = strings.Join(text[1:], " ")
		}

		if len(result.Author) > 0 && len(result.Title) > 0 {
			break
		}
	}

	return result
}

func update_ids(metadata models.Books) models.Books {

	var result models.Books
	books := metadata.Books

	sort.Slice(books, func(i, j int) bool { return books[i].Title < books[j].Title })

	for i := range books {
		books[i].ID = strconv.Itoa(i)
	}

	result.Books = books

	return result
}

func write_file(output models.Books, filename string) {
	wd, _ := os.Getwd()
	parent_dir := filepath.Dir(wd)

	path := filepath.Join(parent_dir, "Assets", filename)

	file, _ := json.MarshalIndent(output, "", "")

	_ = os.WriteFile(path, file, 0644)
}
