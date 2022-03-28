# Cat Gallery

This is a cat gallery built in ReactJS and Typescript. It pulls data from TheCatAPI.

## Points of Interest

* Unit tested (current coverage: 73%)
* Error handling for network errors
* Has loading state (spinner)
* "No data" state when no cat images are found
* Persistent state - lasts through localStorage
* Handling of non-existent paths
* CSS Animations and flexbox layout (for aesthetics)
* Relevant Typescript types are found directly above their functions to mimic the usual syntax in FP (Hindley-Milner)

## On Hindley-Milner notation

This is how a function's type signature is commonly notated in Ramda docs, as well as how it works for Elm or Haskell. This is called [Hindley-Milner notation](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system), and many FP languages follow it.

In Javascript ([reference](https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch07)):
```
// add :: number -> number -> number
const add = (a, b) => a + b
```

In Haskell ([reference](https://www.haskell.org/tutorial/functions.html)):
```
add                     :: Integer -> Integer -> Integer
add x y                 =  x + y
```

In Elm ([reference](https://guide.elm-lang.org/appendix/function_types.html)):
```
add : Number -> Number -> Number
add a b =
  a + b
```

This placement also allows us to write the types of a function with as little impact to the JavaScript code as possible, while being friendly to the norm around type signature notation in an FP style.

Thus, to keep in step with this (as it is also a convenient and pleasing convention), the Typescript type definitions were placed above the function definition, such as:

```
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
```
