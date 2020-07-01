package main

import (
	"fmt"
	"os"
)

func main() {

	fmt.Println("ola")

	nums := []int{2, 3, 4}

	for _,k:= range nums{
		fmt.Println("k:",k)
	}
	for j:= range nums{
		fmt.Println("j:",j)
	}

	//result:time.Now()
	//fmt.Println(result)
	os.Exit(0)
}
