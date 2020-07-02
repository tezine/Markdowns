# GO

* Go does not support classes, but we can can create Structs with methods.
* `fmt package` provides formatted io similar to printf in C language. Ex: `fmt.Println("hello")`
* functions in Go start with `func`
* Statements do not end with `;` in Go. 
* Strings use double quotes
* We can execute the main function inside a Go file like this: `go run hello-world.go` , or we can build the file and execute. Ex: `go build hello-world.go` , than `./hello-world`
* We can strip debug symbols from a Go application in order to reduce it's size. It's also possible to shrink even more using [upx](https://upx.github.io/)
* null in dart is `nil`
* We can stop the execution for one second by using `time.Sleep(1* time.Second)`

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

## Defer

* A defer statement defers (adia) the execution of a function until the surrounding function returns.
* The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

```go
//fmt.Println("world") is executed only when main() is finalized 
func main() {
	defer fmt.Println("world")
	fmt.Println("hello")
}
//output: 
//hello
//world
```

## Panic

* A `panic` typically means something went unexpectedly wrong. Mostly we use it to fail fast on errors that shouldn’t occur during normal operation, or that we aren’t prepared to handle gracefully.
* A common use of panic is to abort if a function returns an error value that we don’t know how to (or want to) handle.
* Running this program will cause it to panic, print an error message and goroutine traces, and exit with a non-zero status.

```go
func main() {
	_, err := os.Create("/tmp/file")
	if err != nil {
		panic(err)
	}
}
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

kvs := map[string]string{"a": "apple", "b": "banana"}
```

* We can declare and initialize a map in the same line. Ex:

```go
n := map[string]int{"foo": 1, "bar": 2}
```

## Range

* Ranges returns 2 values from an array or slice:  The array index, and the array value. If you don't need the index, use `_,`. Ex: 

```go
nums := []int{2, 3, 4}
for _,k:= range nums{
    fmt.Println("k:",k)//Prints k:2,k:3,k:4
}
for j:= range nums{
    fmt.Println("j:",j) //Prints j:0,j:1,j:2
}

//rang with maps below
kvs := map[string]string{"a": "apple", "b": "banana"}
for k, v := range kvs {
    fmt.Printf("%s -> %s\n", k, v)
}
```

## Functions

```go
func plus(a int, b int) int {
	return a + b
}
//it's possible to omit the arg type when all args have the same type as exemplified below
func plusPlus(a, b, c int) int {
    return a + b + c
}
```

Go supports Tuples. Ex:

```go
a, b := vals()
fmt.Println(a,":",b) // prints 3:7

func vals() (int, int) {
	return 3, 7
}
```

## Variadic Functions

[*Variadic functions*](http://en.wikipedia.org/wiki/Variadic_function) can be called with any number of trailing arguments. Ex:

```go
func variadic(nums ...int) {
	for _, num := range nums {
		fmt.Println(num)
	}
}
variadic(1,2,3,4) //prints 1,2,3,4
//it's also possible to pass an array to a variadic function. Ex:
nums := []int{1, 2, 3, 4}
variadic(nums...)
```

## Anonymous Functions / Closures

* Go supports [*anonymous functions*](http://en.wikipedia.org/wiki/Anonymous_function), which can form [*closures*](http://en.wikipedia.org/wiki/Closure_(computer_science)). Anonymous functions are useful when you want to define a function inline without having to name it. Ex:

```go
func intSeq() func() int { //note that intSeq returns a function that returns an integer
    i := 0
    return func() int {
        i++
        return i
    }
}
//since intSeq returns a function, we can assign it to a variable
nextInt := intSeq()
fmt.Println(nextInt())//prints 1
fmt.Println(nextInt())//prints 2
fmt.Println(nextInt())//prints 3

newInts := intSeq()
fmt.Println(newInts())//prints 1
```

## Pointers

* Go supports *[pointers](http://en.wikipedia.org/wiki/Pointer_(computer_programming))*, allowing you to pass references to values and records within your program.

```go
func zeroptr(iptr *int) {
	*iptr = 0
}

i := 1
zeroptr(&i)
fmt.Println("zeroptr:", i) //prints 0
```

## Structs

* Go’s *structs* are typed collections of fields. They’re useful for grouping data together to form records. Ex

```go
type person struct {
	name string
	age  int
}
fmt.Println(person{"Bob", 20}) //prints {Bob 20}
fmt.Println(person{name: "Alice", age: 30}) //prints {Alice 30}
fmt.Println(person{name: "Fred"})//prints {Fred 0}
fmt.Println(&person{name: "Ann", age: 40})//prints &{Ann 40}
```

* We can create a function that creates the person struct. Ex:

```go
func newPerson(name string) *person {
	p := person{name: name}
	p.age = 42
	return &p
}
fmt.Println(newPerson("Jon"))// prints &{Jon 42}
```

## Methods

* Go supports *methods* defined on struct types. Methods can receive struct values or struct pointers. Ex:

```go
//with struct pointers
type person struct {
	name string
	surname  string
}
func (p *person) getFormatted() string {
	p.name="bozo"
	return p.name+" "+ p.surname
}
x:=person{name:"bruno",surname:"tezine"}
fmt.Println(x.getFormatted())//prints bozo tezine
fmt.Println(x.name)//prints bozo
```

```go
//with struct values
func (p person) getFormatted() string {
	p.name="bozo"
	return p.name+" "+ p.surname
}
x:=person{name:"bruno",surname:"tezine"}
fmt.Println(x.getFormatted())//prints bozo tezine
fmt.Println(x.name)//prints bruno
```

## Interfaces

* To implement an interface in Go, we must implement all methods . Ex:

```go
type geometry interface {
	area() float64
	perim() float64
}

func main() {
	r := rect{width: 3, height: 4}
	measure(r)
}

func measure(g geometry) {
	fmt.Println(g) //prints {3 4}
	fmt.Println(g.area()) //prints 12
	fmt.Println(g.perim()) //prints 14
}

//rect implementing geometry interface...
type rect struct {
	width, height float64
}
func (r rect) area() float64 {
	return r.width * r.height
}
func (r rect) perim() float64 { 
	return 2*r.width + 2*r.height
}
//if we comment permim() function, compiler will display an error "rect does not implement geometry (missing perim method)"
```

## Errors

* By convention, errors are the last return value and have type `error`, a built-in interface.
* `errors.New` constructs a basic `error` value with the given error message.
* A `nil` value in the error position indicates that there was no error.

```go
func main() {
	result,error:=testError()
	fmt.Println(result,":",error)
}

func testError() (int,error){
	//return 10 //compiler error since we don't return error
	//return 10, nil //ok 
	return 10,errors.New("My error")
}
```

## Goroutines

* A *goroutine* is a lightweight thread of execution.
* Suppose we have a function call `f(s)`. Here’s how we’d call that in the usual way, running it synchronously: `f("direct")`
* To invoke this function in a goroutine, use `go f(s)`. This new goroutine will execute concurrently with the calling one.

```go
func main(){
	f("direct")
	go f("goroutine") //non blocking call that runs asynchronously, concurrently 
	time.Sleep(time.Second)//if we remove this line, we don't see the output from the goroutines, because main is finalized before ending the execution of the goroutine
	fmt.Println("done")
}

func f(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
}
//output: 
/*
direct : 0
direct : 1
direct : 2
goroutine : 0
goroutine : 1
goroutine : 2
done
*/
```

## Channels

* *Channels* are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values into another goroutine.
* Channels are a typed conduit through which you can send and receive values with the channel operator, `<-`.

```go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and assign value to v.
```

* Like maps and slices, channels must be created before use:

```go
ch := make(chan int)
```

* By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.

```go
func main(){
	done := make(chan string)
	go f("goroutine",done)
	fmt.Println(<-done) //if we comment this line, nothing is printed since main exits before the go routine
}

func f(from string,done chan string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
	done <- "Finalized"
}
//output
/*
goroutine : 0
goroutine : 1
goroutine : 2
Finalized
*/
```

```go
//When waiting for multiple goroutines to finish, you may prefer to use a WaitGroup instead of the example below
func main(){
	done := make(chan int)
	go doThisInParallel(10,done)
	//"continue processing some code synchronously"
	//"than at some point, you may sync and get the go routine response from the channel"
	fmt.Println("hello")
	fmt.Println(<-done)
    fmt.Println("bye")
}

func doThisInParallel(value int,done chan int) {
	result:=0
	for i := 0; i < 10; i++ {
		result+=value
	}
	done <- result
}
//output
/*
hello
100
bye
*/
```

## Channel Buffering

* By default channels are *unbuffered*, meaning that they will only accept sends (`chan <-`) if there is a corresponding receive (`<- chan`) ready to receive the sent value. *Buffered channels* accept a limited number of values without a corresponding receiver for those values. 
* The send in the goroutine with a buffered channel is nonblocking. Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.
* Ex:

```go
func main(){
	messages := make(chan string, 2) // we create a buffer for 2 values
	messages <- "buffered"
	messages <- "channel"
	fmt.Println(<-messages)
	fmt.Println(<-messages)
}
//output
/*
buffered
channel
*/
```

* `make(chan string, 1)` is also buffered

## Channel Direction

* When using channels as function parameters, you can specify if a channel is meant to only send or receive values. Ex

```go
func main() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "passed message")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}

func ping(pings chan<- string, msg string) {//we can only write to the channel pings
	pings <- msg
}

func pong(pings <-chan string, pongs chan<- string) {//we can only read from the channel pings
	msg := <-pings
	pongs <- msg
}
//output: passed message
```

## Select

* Go’s *select* lets you wait on multiple channel operations.
* Select is like  a `switch` for channels. We use `select` to await several channel values simultaneously, in parallel, printing each one as it arrives.
* Selects don't block the thread. If the channel doesn't receive a value, the function will exit normally without calling the case.  

```go
//Since select awaits for the response of all channels, the main thread doesn't exit before receiving the results
func main() {
	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		c1 <- "one"
	}()
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "two"
	}()

	for i := 0; i < 2; i++ {
		select {
		case msg1 := <-c1:
			fmt.Println("received", msg1)
		case msg2 := <-c2:
			fmt.Println("received", msg2)
		}
	}
}
//output 
//1 second later: received one
//2 seconds later: received two
```

## Timeouts

* *Timeouts* are important for programs that connect to external resources or that otherwise need to bound execution time. Implementing timeouts in Go is easy and elegant thanks to channels and `select`.

```go
func main() {
	c1 := make(chan string,1)
	go func() {
		time.Sleep(2 * time.Second)
		c1 <- "result 1"
	}()

	select {
		case res := <-c1:
			fmt.Println(res)//never called
		case <-time.After(1 * time.Second):
			fmt.Println("timeout 1")
	}
}
//output 
//timeout 1
```

## Non-Blocking Channel Operations

* Basic sends and receives on channels are blocking. However, we can use `select` with a `default` clause to implement *non-blocking* sends, receives, and even non-blocking multi-way `select`s.
* Here’s a non-blocking receive. If a value is available on `messages` then `select` will take the `<-messages` `case` with that value. If not it will immediately take the `default` case.

```go
func main() {
    messages := make(chan string)
    select {
    case msg := <-messages:
        fmt.Println("received message", msg)//never executed
    default:
        fmt.Println("no message received")
    }
 }
//output: 
//no message received
```

## Closing Channels

* *Closing* a channel indicates that no more values will be sent on it. This can be useful to communicate completion to the channel’s receivers.

```go
func main{
	jobs := make(chan int, 5)
    ...
	close(jobs)
}
```

## Range over Channels

```go
queue := make(chan string, 2)
queue <- "one"
queue <- "two"
close(queue)
for elem := range queue {
   fmt.Println(elem)
}
//output
//one
//two
```

## Timers

* If you just wanted to wait, you could have used `time.Sleep`. One reason a timer may be useful is that you can cancel the timer before it fires. 

```go
func main() {
	timer1 := time.NewTimer(2 * time.Second)
	<-timer1.C//reads from timer channel when fired
	fmt.Println("Timer fired") //fired after 2 seconds
}
```

## Tickers

* *tickers* are for when you want to do something repeatedly at regular intervals.
* Tickers use a similar mechanism to timers: a channel that is sent values.

```go
ticker := time.NewTicker(500 * time.Millisecond)
go func() {
    for {
        select {
            case t := <-ticker.C:
            fmt.Println("Tick at", t) //prints 3 times before 1600ms
        }
    }
}()
time.Sleep(1600 * time.Millisecond)
ticker.Stop()
fmt.Println("Ticker stopped")
```

## Worker Pools

* These workers will receive work on the `jobs` channel and send the corresponding results on `results`. We’ll sleep a second per job to simulate an expensive task.

```go
func main() {
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)
	for a := 1; a <= numJobs; a++ {
		<-results
	}
}

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		results <- j * 2
	}
}
//output:
/*
worker 3 started  job 3
worker 2 started  job 2
worker 1 started  job 1
worker 1 finished job 1
worker 3 finished job 3
worker 3 started  job 5
worker 2 finished job 2
worker 1 started  job 4
worker 1 finished job 4
worker 3 finished job 5
*/
```

## WaitGroups

* To wait for multiple goroutines to finish, we can use a *wait group*.
* Note that a WaitGroup must be passed to functions by pointer. On return, notify the WaitGroup that we’re done.

```go
func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done() //indicates done after this function is finalized
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second)//to simulate an expensive task
	fmt.Printf("Worker %d done\n", id)
}

func main() {
	var wg sync.WaitGroup
	for i := 1; i <= 5; i++ {
		wg.Add(1)//we have to increment the waitgroup counter for each goroutine
		go worker(i, &wg)
	}
	wg.Wait()//waits for all goroutines. If we comment this line, nothing is printed
}
//the output is not fixed, but it's something like:
/*
Worker 1 starting
Worker 3 starting
Worker 5 starting
Worker 4 starting
Worker 2 starting
Worker 2 done
Worker 4 done
Worker 3 done
Worker 5 done
Worker 1 done
*/
```

## Rate Limiting

* *[Rate limiting](http://en.wikipedia.org/wiki/Rate_limiting)* is an important mechanism for controlling resource utilization and maintaining quality of service. Go elegantly supports rate limiting with goroutines, channels, and [tickers](https://gobyexample.com/tickers).







## Regular Expressions

* More info [here](https://gobyexample.com/regular-expressions)

```go
func main() {
	match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(match)//prints  true

	r, _ := regexp.Compile("p([a-z]+)ch")
	fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))//prints a <fruit>
}
```

## JSON Parser

```go
type person struct {
	Name string
	Address string
	Age int
}

func main() {
	p:= person{Name: "Alice", Age: 30}
	jsonContent, _ := json.Marshal(p)
	fmt.Println(string(jsonContent))//prints {"Name":"Alice","Address":"","Age":30}
    
	var p2 person
	json.Unmarshal(jsonContent, &p2)
	fmt.Println(p2.Name)//prints Alice
}
```





## Reading Files

```go
func main(){
    dat, err := ioutil.ReadFile("/tmp/dat") //returns []byte and error
    check(err)
    fmt.Print(string(dat))

    f, err := os.Open("/tmp/dat")
    check(err)

    b1 := make([]byte, 5)
    n1, err := f.Read(b1)
    check(err)
}

func check(e error) {
    if e != nil {
        panic(e)
    }
}
```



## Writting files

```go
func main() {
    d1 := []byte("hello\ngo\n")
    err := ioutil.WriteFile("/tmp/dat1", d1, 0644)
    check(err)

    f, err := os.Create("/tmp/dat2")
    check(err)
    defer f.Close() //since we use defer, the file is closed only when main() is finalized
    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
}
```

## Directories

```go
err := os.Mkdir("subdir", 0755)

defer os.RemoveAll("subdir")//it's the same as rm -rf subdir

c, err := ioutil.ReadDir("subdir/parent")
for _, entry := range c {
    fmt.Println(" ", entry.Name(), entry.IsDir())
}

err = os.Chdir("subdir/parent/child")//changes the current directory
```

## Command-Line Arguments

```go
func main() {
	argsWithProg := os.Args
	argsWithoutProg := os.Args[1:]
	fmt.Println(argsWithProg)//prints [PoCGo a b c]
	fmt.Println(argsWithoutProg)//prints [a b c]
}
```

## Environment Variables

```go
func main() {
	os.Setenv("FOO", "1")
	fmt.Println("FOO:", os.Getenv("FOO"))//prints FOO: 1
	fmt.Println("BAR:", os.Getenv("BAR"))//prints BAR:
}
```

## HTTP Client

```go
func main() {
	resp, err := http.Get("http://gobyexample.com")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println("Response status:", resp.Status)//prints  Response status: 200 OK
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Print(string(body))
}
```

## HTTP Server

```go
func main() {
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8080", nil)
}

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello\n")
}
```

## Executing external processes

```go
func main() {
	dirCmd := exec.Command("C:\\Program Files\\Git\\usr\\bin\\dir.exe")
	dirOutput, err := dirCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(dirOutput)) //prints the current directory files
}
```

