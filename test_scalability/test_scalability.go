package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {

	t := time.Now()

	wg.Add(100)

	for i := 0; i < 100; i++ {
		go ping(i)
	}

	wg.Wait()

	fmt.Println(time.Now().Sub(t))

}

func ping(i int) {

	defer wg.Done()

	response, err := http.Get("http://localhost:3000/book/id/2")
	if err != nil {
		fmt.Printf("%d, %s\n", i, err)
		return
	}

	defer response.Body.Close()

	// body, err := ioutil.ReadAll(response.Body)

	// fmt.Println(fmt.Sprintf("%d, %s \n", i, body))

}
