# GO

* Go does not support classes, but we can can create Structs with methods.
* `fmt package` provides formatted io similar to printf in C language. Ex: `fmt.Println("hello")`
* functions in Go start with `func`
* Statements do not end with `;` in Go. 
* Strings use double quotes
* We can execute the main function inside a Go file like this: `go run hello-world.go` , or we can build the file and execute. Ex: `go build hello-world.go` , than `./hello-world`
* We can strip debug symbols from a Go application in order to reduce it's size. It's also possible to shrink even more using [upx](https://upx.github.io/)

## Variables

* Variable are typed in Go and declared with `var`. Variables not initialized are zero-valued. 

* `:=` syntax is shorthand for declaring and initializing a variable. 

  ```go
   var a = "initial"
   var b int
   fmt.Println(b)//prints 0
   var e int=10
   fmt.Println(e)
   f := "apple" //it's the same as var f string = "apple"
   var x, z int = 1, 2 //creates the variable x=1 and c=2
   const s string = "constant"
  ```

## IF

* Go doesn't use parentheses in `if`, but braces are required.
* There's no ternary if in Go

```go
if a == 0 {
    fmt.Println("found")
} else {
	fmt.Println("not found")
}
```

* We can declare statements inside if. Ex:

```go
if num := 9; num > 0 {
    fmt.Println(num, "is positive")//num is declared and initialized inside if and can be accessed in all elses
}
```

## FOR

* Go doesn't use parentheses in `for`, but braces are required.

```go
for j := 7; j <= 9; j++ {
    fmt.Println(j)
}
```

## Switch

* There's no need to use `break`  between cases

```go
i := 1
switch i {
  case 1:
    fmt.Println("one")
   case 2:
    fmt.Println("two")
}
//Prints 1. 
```

* We can use comma to separate multiple expressions in the same statement. Ex: 

```go
switch time.Now().Weekday() {
   case time.Saturday, time.Sunday:
     fmt.Println("It's the weekend")
   default:
    fmt.Println("It's a weekday")
}
```

## Arrays

*  *array* is a numbered sequence of elements of a specific length.
* By default an array is zero-valued

```go
var a [5]int
fmt.Println("array:", a) //prints array: [0 0 0 0 0]
fmt.Println("length:", len(a)) //prints length: 5
b := [5]int{1, 2, 3, 4, 5}
fmt.Println(b) //prints [1 2 3 4 5]
nums := []int{2, 3, 4}
```

## Maps

* Maps in Go are similar to QMap in Qt. 
* Printing a map with  `fmt.Println` will show all of its key/value pairs.

```go
m := make(map[string]int) //creates a map where key is string and value is integer
m["age"]=18
fmt.Println(m["age"]) //prints 18
delete(m, "age") //removes the key/value "age" from the map
```

* We can declare and initialize a map in the same line. Ex:

```go
n := map[string]int{"foo": 1, "bar": 2}
```

## Range

* Ranges returns 2 values from an array:  The array index, and the array value. If you don't need the index, use `_,`. Ex: 

```go
nums := []int{2, 3, 4}
for _,k:= range nums{
    fmt.Println("k:",k)//Prints k:2,k:3,k:4
}
for j:= range nums{
    fmt.Println("j:",j) //Prints j:0,j:1,j:2
}
```



