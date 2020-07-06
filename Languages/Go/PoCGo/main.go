package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	fmt.Println(time.Now().Format(time.RFC822))//
}

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Ola Josiel!!!!\n")
}
