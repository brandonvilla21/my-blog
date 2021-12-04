---
title: 'Golang for JS Devs'
description: 'My personal notes to learn the basics of Go'
coverImage: '/golang.png'
---

**These are my personal notes with code samples to explain key concepts of Go's language. I think these notes can be useful for anyone starting to learn Go or even using it as a cheat sheet.**


- [Variables](#variables)
- [Logs](#logs)
- [Variadic parameters](#variadic-parameters)
- [Statically typed](#statically-typed)
- [Strings](#strings)
- [Arrays and Slices](#arrays-and-slices)
- [Maps](#maps)
- [Structs](#structs)
- [Embedded structs](#embedded-structs)
- [Methods](#methods)
- [Interfaces and Polymorfism](#interfaces-and-polymorfism)
- [Anonymous functions](#anonymous-functions)
- [Pointers](#pointers)
- [JSONs](#jsons)





## <a id="variables"></a> Variables

```go
// Global scope declaration
var x int

func main() {
	// Shorthand declaration (recommended)
	x := 10
	fmt.Println(x) // 10
}
```

## <a id="logs"></a> Logs

```go
func main() {
	fmt.Println("Hello from Go!") // Hello from Go
	x := "Hello from Go!"
	
	// Print with format
	
	// %q a single-quoted character literal safely escaped with Go syntax.
	fmt.Printf("%q\n", x) // Hello from Go!
	
	y := 10
	fmt.Printf("%b\n", y) // 1010 (prints number in binary)
	fmt.Printf("%d\n", y) // 10   (prints number in decimal)
	fmt.Printf("%x\n", y) // a    (prints number in hexadecimal)
	
	// Print the type of the value
	fmt.Printf("%T\n", y) // int
}
```

## <a id="variadic-parameters"></a> Variadic parameters (x...)

**Variadic parameter** is to what we call in JavaScript spread operator:

```go
func main() {
	numbers(1, 2, 3, 4)
}

func numbers(x ...int) {
	fmt.Println(x) // [1 2 3 4]
	fmt.Printf("%T", x) // []int (it prints the data type)
}
```

## <a id="statically-typed"></a> Statically typed

Go is **statically typed**:

```go
// Statically typed means:
func main() {
	a := 10
	fmt.Printf("%T\n", a) // int

	a = "now is string value" // this will show an error as is not dynamically typed
}
```

## <a id="strings"></a> Strings

**Strings are immutable**

A string is also an array of bytes, this means that you can access to the indexes of the string doing something like this: `str[0]` and you will get the value of the letter specified in ASCII

If you're more familiarized with JavaScript or Python you'd be expecting to see the letter instead of the ASCII value, there's also a way to get this value:

```go
func main() {
	text := "Hello world"
	fmt.Println(text) // Hello world
	fmt.Println(text[0]) // 72
	fmt.Println(text[1]) // 101
	fmt.Printf("%T\n", text[0]) // uint8 (byte = uint8)

	// Get the letter instead of the ASCII value (by doing a conversion)
	letter := string(text[0])
	fmt.Println(letter) // H

	// You can also make a conversion from string to array of bytes:
	bs := []byte(text)
	fmt.Println(bs) // [72 101 108 108 111 32 119 111 114 108 100]
}
```

## <a id="arrays-and-slices"></a> Arrays and Slices

Arrays are usually declared like this: `var a [4]int` whereas slices are normally declared like this: `x := []int{1, 2, 3, 4}`

Slices are a bit more flexible than arrays since arrays are limited by a length from the beginning. Slices are built on arrays so slices have all the capabilities of an array and they are more flexible

For more explanation between arrays and slices: [https://blog.golang.org/slices-intro](https://blog.golang.org/slices-intro)

**Operations over arrays/slices**:

```go
func main() {
	var x [5]int
	// Array's elements are initialized by default depending on the data type
	fmt.Println(x) // [0, 0, 0, 0, 0]

	// Get the length
	len(x) // 5 
}
```

**Slices** using composite literals

```go
func main() {
	// this is a composite literal => dataType{}
	x := []int{3, 50 ,1 , 56, 5}

	// you can iterate over arrays/slices using the for-range loop
	for i, v := range x {
		fmt.Println(i, v) // index, value
	}

	// Get a slice from the slice
	fmt.Println(x[1:3]) // [50, 1]

	// Append to a slice
	fmt.Println(append(x, 4, 6)) // [3, 50 ,1 , 56, 5, 4, 6]
	y := []int{1, 2, 3, 4}

	// Append two slices
	fmt.Println(append(x, y...)) // [3, 50 ,1 , 56, 5, 1, 2, 3, 4]

	// Delete an element in the slice (remove the third element)
	append(x[:2], x[3:]...) // [3, 50, 56, 5]
}
```

## <a id="maps"></a> Maps

```go
func main() {
	x := map[string]int{
		"Ana": 30,
		"Joe": 40,
	}
	fmt.Println(x) // map[Ana:30 Joe:40]
	fmt.Println(x["Joe"]) // 40
	fmt.Println(x["None"]) // 0 (zero indexed for non-assigned indexes in the Map)

	// To check if the value is actually indexed or not
	v, ok := x["Nah"]
	fmt.Println(v) // 0
	fmt.Println(ok) // false

	// A common idiomatic statement in Go
	if v, ok := x["Joe"]; ok {
		// Do something when it DOES exists
	}

	// Append element to Map
	x["John"] = 40

	// Delete element from Map
	delete(x, "Joe")
	fmt.Println(x) // (Will print without the removed element)
}
```

## <a id="structs"></a> Structs

The syntax is very similar to JS literal objects but internally they are a very different thing, in fact, in Go they don't call it objects but `struct`

> Structs is a composite data type

```go
type person struct {
	name string
	age  int
}

func main() {
	x := person{
		name: "John Doe",
		age:  40,
	}
	fmt.Println(x) // {John Doe 40}
	fmt.Println(x.name, x.age) // John Doe 40
}
```

### <a id="embedded-structs"></a> Embedded structs

```go
type person struct {
	name string
	age  int
}

type student struct {
	alumni person
	school string
}

func main() {
	x := student{
		alumni: person{
			name: "John Doe",
			age:  40,
		},
		school: "MIT",
	}
	fmt.Println(x)
	fmt.Println(x.alumni.name, x.alumni.age)
}
```

## <a id="methods"></a> Methods

**Go** does not have classes. However, you can define methods on types. A method is a function with a special receiver argument. The receiver appears in its own argument list between the `func` keyword and the method name:

```go
type person struct {
	name string
	age  int
}
// This function will be attached to any variable whose type is person
func (p person) sayHello() string {
	return "Hello, my name is " + p.name
}

func main() {
	x := person{
		name: "John Doe",
		age:  40,
	}
	y := person{
		name: "Ana Doe",
		age:  40,
	}
	fmt.Println(x.sayHello()) // Hello, my name is John Doe
	fmt.Println(y.sayHello()) // Hello, my name is Ana Doe
}
```

## <a id="interfaces-and-polymorfism"></a> Interfaces and Polymorfism

```go
// TL;DR:
// The type person is also type human
// The type student is also type human

type person struct {
	name string
	age  int
}

type student struct {
	alumni person
	school string
}

func (p person) sayHello() string {
	return "Hello, my name is " + p.name
}

func (s student) sayHello() string {
	return "Hello, my name is " + s.alumni.name
}

// Any type that has a sayHello() function will also be type human
// This means that person and student are also type human
type human interface {
	sayHello() string
}

func humanCanPass(h human) {
	fmt.Println("Hey! I'm a human", h)
}

func main() {
	p := person{
		name: "John Doe",
		age:  40,
	}
	s := student{
		alumni: person{
			name: "Ana Doe",
			age:  30,
		},
		school: "MIT",
	}
	fmt.Println(p.sayHello())
	fmt.Println(s.sayHello())

	humanCanPass(p)
	humanCanPass(s)
}
```

## <a id="anonymous-functions"></a> Anonymous function

```go
// (func expression)
func main() {
	x := func (s string){
		fmt.Println("Hey!", s)
	}
	
	x("John")
}
```

Returning a function is also valid:

```go
func main() {
	x := thisIsValid()
	fmt.Println(x("John")) // Hello John

}

func thisIsValid() func(s string) string {
	return func(s string) string {
		return "Hello " + s
	}
}
```

## <a id="pointers"></a> Pointers

`&` gives you the address (reference) in memory

`*` de-references the address to its value stored

```go
func main() {
	x := 21
	fmt.Println(x) // 21
	fmt.Println(&x) // 0xc0000b6020 (of course this will vary on every machine)

	y := &x
	fmt.Println(y) // 0xc0000b6020
	fmt.Println(*y) // 21

	// This is valid too
	fmt.Println(*&x) // 21
}
```

## <a id="jsons"></a> JSONs

Example of parsing a slice of person `struct` to a JSON string

```go
import (
	"encoding/json"
	"fmt"
)
// Keys must be capitalized
type person struct {
	Name     string
	LastName string
	Age      int
}

func main() {
	p1 := person{
		Name:     "John",
		LastName: "Doe",
		Age:      40,
	}
	p2 := person{
		Name:     "Ana",
		LastName: "Doe",
		Age:      32,
	}
	people := []person{p1, p2}

	bs, err := json.Marshal(people)

	if err != nil {
		fmt.Println("The error => ", err)
	}

	fmt.Println(string(bs)) // [{"Name":"John","LastName":"D....
}
```

Example of parsing a JSON string to a person struct slice (The opposite as the prev example)

```go
import (
	"encoding/json"
	"fmt"
)

type person struct {
	Name     string
	LastName string
	Age      int
}

func main() {
	jsonString := `[{"Name":"John","LastName":"Doe","Age":40},{"Name":"Ana","LastName":"Doe","Age":32}]`
	jsonBytes := []byte(jsonString)
	people := []person{}

	err := json.Unmarshal(jsonBytes, &people)

	if err != nil {
		fmt.Println("The error => ", err)
	}

	fmt.Println(people[0].Name) // John
	fmt.Println(people[0].LastName) // Doe
	fmt.Println(people[1].Name) // Ana
}
```

I will keep updating this post with more topics...

