package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/messysoup/react-go-bookquotes/models"
)

func get_by_book_title(c *gin.Context) {
	title := c.Param("title")

	quote, err := get_book_file(title, "title")

	send_request(quote, err, c)
}

func get_book_by_id(c *gin.Context) {
	id := c.Param("id")

	quote, err := get_book_file(id, "id")

	send_request(quote, err, c)

}

func get_number_of_books(c *gin.Context) {
	var num_of_books models.Number_of_Books

	num_of_books.BookCount = len(book_metadata.Books)

	c.IndentedJSON(http.StatusOK, num_of_books)

}

func send_request(quote models.Book_data, err error, c *gin.Context) {
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, quote)
}

func get_book_file(identifier string, identifier_type string) (models.Book_data, error) {

	var default_value models.Book_data
	default_err := fmt.Errorf("no matching book for: %q: %q", identifier_type, identifier)

	for _, book := range book_metadata.Books {

		switch identifier_type {
		case "title":
			if book.Title == identifier {

				cached, err := get_cache(book)

				result, err := get_book_file_helper(book, cached, err)

				return result, err

			}
		case "id":
			if book.ID == identifier {

				cached, err := get_cache(book)

				result, err := get_book_file_helper(book, cached, err)

				return result, err

			}
		}
	}

	return default_value, default_err
}

func get_book_file_helper(book models.Book_data, cached models.Cached_book, err error) (models.Book_data, error) {

	if err == nil {

		cached.Quote = get_sentence(split_sentences(cached.Content), false)

		result := transform_to_book_data(cached)

		return result, nil
	}

	content := get_content(book.BookFile)

	cached = transform_to_cached_book(book, content)

	set_cache(cached)

	book.Quote = get_sentence(split_sentences(content), false)

	return book, nil
}

func get_content(file_name string) string {

	wd, _ := os.Getwd()

	cleaned_filepath := filepath.Join(wd, "Assets", "Books", file_name)

	content, err := os.ReadFile(cleaned_filepath)
	if err != nil {
		fmt.Println("unable to read file: ", err)
	}

	s_content := string(content)

	re := regexp.MustCompile(`\r?\n`)

	cleaned := re.ReplaceAllString(s_content, " ")
	cleaned = strings.ReplaceAll(cleaned, "  ", " ")

	words_as_array := strings.Split(cleaned, " ")

	body := get_body(words_as_array)

	return strings.Join(body, " ")
}

func get_body(content []string) []string {
	start_delimiter := `*****START_OF_CONTENT*****`
	end_delimiter := `*****END_OF_CONTENT*****`

	start_index := 0
	end_index := 0

	for i, v := range content {
		if v == start_delimiter {
			start_index = i + 1
			break
		}
	}

	for i := len(content) - 1; i >= 0; i-- {
		if content[i] == end_delimiter {
			end_index = i - 1
		}
	}

	return content[start_index:end_index]

}

func split_sentences(content string) [][]string {

	var result [][]string

	var temp_slice []string

	for _, word := range strings.Fields(content) {
		temp_slice = append(temp_slice, word)

		bool_check := strings.ContainsAny(word, ".!?") &&
			!strings.Contains(word, "Mr.") && !strings.Contains(word, "Ms.") &&
			!strings.Contains(word, "Mrs.") && !strings.Contains(word, "Dr.") &&
			!strings.Contains(word, "CHAPTER")

		if bool_check {
			result = append(result, temp_slice)
			temp_slice = nil
		}
	}

	return result

}

func get_sentence(content_as_sentences [][]string, continuous bool) string {

	rand.Seed(time.Now().UnixNano())

	if continuous {
		for {
			random := rand.Intn(len(content_as_sentences))
			fmt.Println(content_as_sentences[random])

			consoleReader := bufio.NewReader(os.Stdin)
			fmt.Print("Enter 'exit' to stop:  ")
			input, _ := consoleReader.ReadString('\n')

			input = strings.ToLower(input)

			if strings.HasPrefix(input, "exit") {
				os.Exit(0)
			}
		}

	} else {

		for {
			random := rand.Intn(len(content_as_sentences))

			sentence := content_as_sentences[random]

			if len(sentence) < 2 {
				continue
			} else {
				return ensure_capitalization(string(strings.Join(sentence, " ")))
			}

		}
	}
}

func ensure_capitalization(s string) string {

	var result string

	for i, v := range s {
		// Loop through string and capitalize the first letter.
		value := string(v)
		if strings.ToUpper(value) != strings.ToLower(value) {
			result = result + strings.ToUpper(value)
			result = result + s[i+1:]

			break

		} else {
			result = result + value
		}

	}

	return result

}
