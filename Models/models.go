package models

type Books struct {
	Books []Book_data
}

type Book_data struct {
	ID       string `json:"Id"`
	Title    string `json:"Title"`
	Author   string `json:"Author"`
	BookFile string `json:"BookFile"`
	Quote    string `json:"Quote"`
}

type Cached_books struct {
	Books []Cached_book
}

type Cached_book struct {
	ID       string `json:"Id"`
	Title    string `json:"Title"`
	Author   string `json:"Author"`
	BookFile string `json:"BookFile"`
	Quote    string `json:"Quote"`
	Content  string `json:"Content"`
}
