---
title: "Golang Clean Code: Constant"
subtitle: "Constant is a very useful feature in the Golang programming language, and IOTA is very powerful but not popular."
date: 2023-01-29
canonicalURL: "https://medium.com/@khafidprayoga/golang-clean-code-constant-and-iota-94ced892a6da"
bannerURL: "https://ik.imagekit.io/zq4s7yjq3/blog/image/1_1PA7I3A4LitOlCG-yMWf5g.png?tr=w-1280,h-720,fo-center,f-webp,q-50,c-maintain-ratio"
published: true
---

*const* is a keyword used to initialize a variable with an immutable value. They are compile-time constants rather than runtime variables. IOTA is powerful but not very popular!

You can do many things with constants, such as storing database credentials. To create a constant, you can use the *const* keyword followed by the value of a data type.

```go
// timeout contains the second time in type time.Duration which   
// time.Duration is a type alias of int64 ```type Duration int64```  
const timeout = 1 * time.Second  
  
// Initialize the `typed constant`   
// for more specific typed data  
const age int = 18  
const gasPrice float64 = 16.50
```

In the code snippet above, there are two ways to use the constant keyword:

First, you can write a constant with a dynamic value (untyped constant) which means that the value can be filled with initialization of any data such as *string, int, map[string]any.*

Second, to get a fixed data type (typed constant), you must determine the type of data type used to hold the constant value. In the code snippet above, *const age int = 18* makes a constant statement with type *int* and value *18.* If you initialize the value with a string on *gasPrice,* then an error will occur "(type string) cannot be represented by the type float64."

In the case above, the code creates a constant line by line by writing the *const* keyword, variable name, and value. But there is a better way, which is the variable name in the group of a constant using the *const (…)* keyword.

```go
const (  
 username = "johndoe"  
 password = "superuser"  
)
```

In the code snippet above are a *username* and *password,* which are credentials to access a database (for example). You can use this method to create a group of constants that are related to each other.

The following is an example of a collection of related constants in a group in the Golang package standard library (*package* *time*)

```go
const (  
 Nanosecond  Duration = 1  
 Microsecond          = 1000 * Nanosecond  
 Millisecond          = 1000 * Microsecond  
 Second               = 1000 * Millisecond  
 Minute               = 60 * Second  
 Hour                 = 60 * Minute  
)
```

Besides constants that can be grouped as above, you can define an enum using the *iota* keyword, an untyped int, with the index always starting from 0, or you can skip for a specific point.

```go
// A Weekday specifies a day of the week (Sunday = 0, ...).  
type Weekday int  
  
const (  
 Sunday Weekday = iota  
 Monday  
 Tuesday  
 Wednesday  
 Thursday  
 Friday  
 Saturday  
)
```

When you create a new constant after the first constant, its value will automatically increase incrementally. For example, in the constant of type Weekday, there is a constant Monday, which is worth 1, Tuesday is worth 2, and so on. For best practice, when you get a new constant, add it after the bottom constant so that the constant value remains consistent.

```go
// A Weekday specifies a day of the week (Sunday = 0, ...).  
type Weekday int  
  
const (  
 Sunday Weekday = iota  
 Monday  
 Tuesday  
 Wednesday  
 Thursday  
 Friday  
 Saturday  
 AnotherDay // example  
)
```

If you want to create several different enum groups, you can create the *const* and *iota* keywords as follows:

```go
// Filter product names by alphabetical order  
const (  
 FilterFromAtoZ = iota + 1  
 FilterFromZtoA  
)  
  
// Grouping product by size, category, or default  
const (  
 Default = iota  
 GroupBySize  
 GroupByCategory  
)
```

The **FilterFromZtoA** constant will be 2, and when creating a new constant in **GroupByCategory,** it will be two too. In conclusion, the incremental process by iota will occur inside the *const (…)* circle bracket.

For best practice, index 0 of iota I suggest is a **Default Enum,** which can make it easier when parsing data. For example, in incoming requests to the backend server, the query parameters are not filled in, so it will be the default value of int, which is 0. This is my experience when extracting query parameter data in a struct.

But if the struct is given a type \*int pointer int, then the value will be nil, so you have to check *if groupBy != nil {}*. In addition, you can create a type alias of the enum so that the code is more readable and neat, as in the package time snippet:

```go
type Weekday int
```

When creating a new project, I usually list common constants such as success, error, and logic-checking status. The goal is to make the code easier to read

```sh
.  
├── incomingEvent.go  
└── internalTypes  
    ├── error.go  
    └── success.go
```

For example, the *internalTypes/error.go* file contains the following code

```go
var (  
 ErrProductSKUAlreadyUsed = errors.New("product SKU already used, please use another SKU id")  
 ErrCouponCodeDuplicated  = errors.New("code already used, please generate another coupon code")  
)
```

Then I looked for data in the database that has product SKU "**92345678**" but the data is already used, but the incoming *createProduct* request wants to use the id that has been used.

So that in the data layer, I can make *internalTypes.ProductSKUAlreadyUsed* return, and when the error reaches the logic layer, the error response can be adjusted to a certain format.

```go
// Logic layer calls the data layer  
 err := ErrProductSKUAlreadyUsed  
 if err != nil {  
  if errors.Is(err, internalTypes.ErrProductSKUAlreadyUsed) {  
   return err  
  }  
  if errors.Is(err, internalTypes.ErrCouponCodeDuplicated) {  
   return err  
  }  
 }
```